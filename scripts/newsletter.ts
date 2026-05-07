/**
 * Send a newsletter issue to confirmed subscribers in the issue's locale.
 *
 * Usage:
 *   npx tsx scripts/newsletter.ts <issue-slug> [--dry-run] [--subject="..."]
 *
 * Reads issues from ../.local/newsletter/<slug>.md (override with NEWSLETTER_DIR).
 *
 * Examples:
 *   npx tsx scripts/newsletter.ts example
 *   npx tsx scripts/newsletter.ts example --dry-run
 *   npx tsx scripts/newsletter.ts example --subject="A different subject line"
 */

import { config } from 'dotenv';
config({ path: '.env.local' });

import readline from 'readline';
import { writeFileSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import { and, eq, isNull } from 'drizzle-orm';
import { Resend } from 'resend';
import { render } from '@react-email/render';
import { db } from '../src/db/index';
import { subscribers, newsletterSends } from '../src/db/schema';
import { getIssueBySlug } from '../src/lib/newsletter/issues';
import { getDictionary } from '../src/i18n/getDictionary';
import { NewsletterIssue } from '../src/emails/NewsletterIssue';

interface Args {
  slug: string;
  dryRun: boolean;
  subject?: string;
}

function parseArgs(): Args {
  const argv = process.argv.slice(2);
  const positional: string[] = [];
  let dryRun = false;
  let subject: string | undefined;

  for (const arg of argv) {
    if (arg === '--dry-run') {
      dryRun = true;
    } else if (arg.startsWith('--subject=')) {
      subject = arg.slice('--subject='.length).replace(/^"|"$/g, '');
    } else if (arg === '--help' || arg === '-h') {
      console.log(
        'Usage: npx tsx scripts/newsletter.ts <issue-slug> [--dry-run] [--subject="..."]',
      );
      process.exit(0);
    } else {
      positional.push(arg);
    }
  }

  if (positional.length === 0) {
    console.error('Error: issue slug is required.');
    console.error(
      'Usage: npx tsx scripts/newsletter.ts <issue-slug> [--dry-run] [--subject="..."]',
    );
    process.exit(1);
  }

  return { slug: positional[0], dryRun, subject };
}

function prompt(question: string): Promise<string> {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

function absolutizeLinks(markdown: string, siteUrl: string): string {
  return markdown.replace(/\]\((\/[^)]+)\)/g, `](${siteUrl}$1)`);
}

async function main() {
  const args = parseArgs();

  if (!process.env.RESEND_API_KEY) {
    console.error('Error: RESEND_API_KEY not set in .env.local');
    process.exit(1);
  }
  if (!process.env.DATABASE_URL) {
    console.error('Error: DATABASE_URL not set in .env.local');
    process.exit(1);
  }

  const issue = getIssueBySlug(args.slug);
  if (!issue) {
    console.error(`Error: issue not found for slug "${args.slug}"`);
    console.error(`Looked in: ${process.env.NEWSLETTER_DIR ?? '../.local/newsletter'}`);
    process.exit(1);
  }

  const siteUrl = (process.env.SITE_URL || 'https://benedikt.valdez.is').replace(/\/$/, '');
  const fromAddress = process.env.NEWSLETTER_FROM_EMAIL || 'Benedikt Valdez <benedikt@valdez.is>';
  const subject = args.subject ?? issue.subject;
  const absoluteBody = absolutizeLinks(issue.body, siteUrl);
  const dict = await getDictionary(issue.locale);
  const emailCopy = dict.subscribe.issueEmail;

  const recipients = await db
    .select({
      id: subscribers.id,
      email: subscribers.email,
      unsubscribeToken: subscribers.unsubscribeToken,
    })
    .from(subscribers)
    .leftJoin(
      newsletterSends,
      and(
        eq(newsletterSends.subscriberId, subscribers.id),
        eq(newsletterSends.issueSlug, issue.slug),
      ),
    )
    .where(
      and(
        eq(subscribers.status, 'confirmed'),
        eq(subscribers.locale, issue.locale),
        isNull(newsletterSends.id),
      ),
    );

  console.log('');
  console.log(`Issue:       ${issue.subject}`);
  console.log(`Slug:        ${issue.slug}`);
  console.log(`Locale:      ${issue.locale}`);
  console.log(`Date:        ${issue.date}`);
  console.log(`From:        ${fromAddress}`);
  console.log(`Subject:     ${subject}`);
  console.log(`Recipients:  ${recipients.length}`);
  console.log('');

  if (args.dryRun) {
    const sampleHtml = await render(
      NewsletterIssue({
        locale: issue.locale,
        issue: {
          subject: issue.subject,
          date: issue.date,
          preview: issue.preview,
          body: absoluteBody,
        },
        unsubscribeUrl: `${siteUrl}/${issue.locale}/subscribe/unsubscribe?token=PREVIEW`,
        copy: emailCopy,
      }),
    );
    const previewPath = join(tmpdir(), `newsletter-${issue.slug}.html`);
    writeFileSync(previewPath, sampleHtml);
    console.log(`Dry run. Preview HTML written to:`);
    console.log(`  ${previewPath}`);
    process.exit(0);
  }

  if (recipients.length === 0) {
    console.log('No recipients to send to. Exiting.');
    process.exit(0);
  }

  const answer = (await prompt(`Send to ${recipients.length} recipient(s)? [y/N] `))
    .trim()
    .toLowerCase();
  if (answer !== 'y' && answer !== 'yes') {
    console.log('Aborted.');
    process.exit(0);
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  let sent = 0;
  let failed = 0;

  for (const r of recipients) {
    const unsubscribeUrl = `${siteUrl}/${issue.locale}/subscribe/unsubscribe?token=${encodeURIComponent(r.unsubscribeToken)}`;
    const listUnsubscribeUrl = `${siteUrl}/api/unsubscribe?token=${encodeURIComponent(r.unsubscribeToken)}&locale=${issue.locale}`;
    const html = await render(
      NewsletterIssue({
        locale: issue.locale,
        issue: {
          subject: issue.subject,
          date: issue.date,
          preview: issue.preview,
          body: absoluteBody,
        },
        unsubscribeUrl,
        copy: emailCopy,
      }),
    );
    const text = await render(
      NewsletterIssue({
        locale: issue.locale,
        issue: {
          subject: issue.subject,
          date: issue.date,
          preview: issue.preview,
          body: absoluteBody,
        },
        unsubscribeUrl,
        copy: emailCopy,
      }),
      { plainText: true },
    );

    try {
      const result = await resend.emails.send({
        from: fromAddress,
        to: r.email,
        subject,
        html,
        text,
        headers: {
          'List-Unsubscribe': `<${listUnsubscribeUrl}>`,
          'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
        },
      });

      if (result.error) {
        console.error(`  ✗ ${r.email}: ${result.error.message}`);
        failed++;
        continue;
      }

      await db.insert(newsletterSends).values({
        subscriberId: r.id,
        issueSlug: issue.slug,
        resendMessageId: result.data?.id ?? null,
      });

      console.log(`  ✓ ${r.email}`);
      sent++;
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(`  ✗ ${r.email}: ${message}`);
      failed++;
    }
  }

  console.log('');
  console.log(`Done. Sent: ${sent}, failed: ${failed}.`);
  process.exit(failed > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
