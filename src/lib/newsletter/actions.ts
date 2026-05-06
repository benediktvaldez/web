'use server';

import { z } from 'zod';
import { and, eq } from 'drizzle-orm';
import { Resend } from 'resend';
import { render } from '@react-email/render';
import { db } from '@/db';
import { subscribers, unsubscribeFeedback } from '@/db/schema';
import { locales, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import { newToken, isConfirmTokenExpired } from './tokens';
import { ConfirmSubscription } from '@/emails/ConfirmSubscription';

const subscribeSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  locale: z.enum(locales),
});

export type SubscribeData = z.infer<typeof subscribeSchema>;

export type ActionResult = { success: true } | { success: false; error: string };

const FEEDBACK_REASONS = ['inboxCleanup', 'notForMe', 'accidental', 'other'] as const;
export type FeedbackReason = (typeof FEEDBACK_REASONS)[number];

const feedbackSchema = z.object({
  token: z.string().min(1),
  reason: z.enum(FEEDBACK_REASONS),
  reasonOther: z.string().trim().max(2000).optional(),
});

export type FeedbackData = z.infer<typeof feedbackSchema>;

export async function subscribe(data: SubscribeData): Promise<ActionResult> {
  const parsed = subscribeSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: 'invalid_email' };
  }

  const { email, locale } = parsed.data;

  try {
    const existing = await db
      .select()
      .from(subscribers)
      .where(and(eq(subscribers.email, email), eq(subscribers.locale, locale)))
      .limit(1);

    let confirmToken: string;
    let row = existing[0];

    if (row?.status === 'confirmed') {
      return { success: true };
    }

    if (row && row.status !== 'unsubscribed') {
      confirmToken = newToken();
      await db
        .update(subscribers)
        .set({ confirmToken, createdAt: new Date() })
        .where(eq(subscribers.id, row.id));
    } else if (row) {
      confirmToken = newToken();
      await db
        .update(subscribers)
        .set({
          status: 'pending',
          confirmToken,
          unsubscribeToken: newToken(),
          createdAt: new Date(),
          confirmedAt: null,
          unsubscribedAt: null,
        })
        .where(eq(subscribers.id, row.id));
    } else {
      confirmToken = newToken();
      const inserted = await db
        .insert(subscribers)
        .values({
          email,
          locale,
          status: 'pending',
          confirmToken,
          unsubscribeToken: newToken(),
        })
        .returning();
      row = inserted[0];
    }

    await sendConfirmationEmail({ email, locale, token: confirmToken });

    return { success: true };
  } catch {
    return { success: false, error: 'send_failed' };
  }
}

export async function confirmSubscription(token: string): Promise<ActionResult> {
  if (!token) return { success: false, error: 'invalid_token' };

  try {
    const row = (
      await db.select().from(subscribers).where(eq(subscribers.confirmToken, token)).limit(1)
    )[0];

    if (!row) return { success: false, error: 'invalid_token' };
    if (isConfirmTokenExpired(row.createdAt)) {
      return { success: false, error: 'expired' };
    }

    await db
      .update(subscribers)
      .set({ status: 'confirmed', confirmToken: null, confirmedAt: new Date() })
      .where(eq(subscribers.id, row.id));

    return { success: true };
  } catch {
    return { success: false, error: 'send_failed' };
  }
}

export async function unsubscribe(token: string): Promise<ActionResult> {
  if (!token) return { success: false, error: 'invalid_token' };

  try {
    const row = (
      await db.select().from(subscribers).where(eq(subscribers.unsubscribeToken, token)).limit(1)
    )[0];

    if (!row) return { success: false, error: 'invalid_token' };

    if (row.status !== 'unsubscribed') {
      await db
        .update(subscribers)
        .set({ status: 'unsubscribed', unsubscribedAt: new Date() })
        .where(eq(subscribers.id, row.id));
    }

    return { success: true };
  } catch {
    return { success: false, error: 'send_failed' };
  }
}

export async function submitUnsubscribeFeedback(data: FeedbackData): Promise<ActionResult> {
  const parsed = feedbackSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: 'invalid_data' };
  }

  const { token, reason, reasonOther } = parsed.data;

  try {
    const row = (
      await db.select().from(subscribers).where(eq(subscribers.unsubscribeToken, token)).limit(1)
    )[0];

    if (!row) return { success: false, error: 'invalid_token' };
    if (row.status !== 'unsubscribed') return { success: false, error: 'not_unsubscribed' };

    await db
      .insert(unsubscribeFeedback)
      .values({
        email: row.email,
        locale: row.locale,
        reason,
        reasonOther: reason === 'other' && reasonOther ? reasonOther : null,
      })
      .onConflictDoNothing({
        target: [unsubscribeFeedback.email, unsubscribeFeedback.locale],
      });

    return { success: true };
  } catch {
    return { success: false, error: 'save_failed' };
  }
}

async function sendConfirmationEmail({
  email,
  locale,
  token,
}: {
  email: string;
  locale: Locale;
  token: string;
}) {
  const t = await getDictionary(locale);
  const siteUrl = (process.env.SITE_URL || 'https://benedikt.valdez.is').replace(/\/$/, '');
  const confirmUrl = `${siteUrl}/${locale}/subscribe/confirm?token=${encodeURIComponent(token)}`;

  const html = await render(
    ConfirmSubscription({ locale, confirmUrl, copy: t.subscribe.confirmEmail }),
  );
  const text = await render(
    ConfirmSubscription({ locale, confirmUrl, copy: t.subscribe.confirmEmail }),
    { plainText: true },
  );

  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from: process.env.NEWSLETTER_FROM_EMAIL || 'Benedikt Valdez <benedikt@valdez.is>',
    to: email,
    subject: t.subscribe.confirmEmail.subject,
    html,
    text,
  });
}
