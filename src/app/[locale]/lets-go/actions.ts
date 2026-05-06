'use server';

import { z } from 'zod';
import { Resend } from 'resend';
import { db } from '@/db';
import { inquiries } from '@/db/schema';

const resend = new Resend(process.env.RESEND_API_KEY);

const inquirySchema = z.object({
  type: z.string().min(1),
  details: z.string().optional().default(''),
  timeline: z.string().optional().default(''),
  name: z.string().min(1),
  email: z.string().email(),
  company: z.string().optional().default(''),
  locale: z.string().min(2).max(2),
});

export type InquiryData = z.infer<typeof inquirySchema>;

export async function submitInquiry(data: InquiryData) {
  const parsed = inquirySchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: 'Invalid data' };
  }

  try {
    // Store in database
    await db.insert(inquiries).values({
      type: parsed.data.type,
      details: parsed.data.details || null,
      timeline: parsed.data.timeline || null,
      name: parsed.data.name,
      email: parsed.data.email,
      company: parsed.data.company || null,
      locale: parsed.data.locale,
    });

    // Send email notification
    const d = parsed.data;
    const rows = [
      { label: 'From', value: d.company ? `${d.name} at ${d.company}` : d.name },
      {
        label: 'Email',
        value: `<a href="mailto:${d.email}" style="color:#bf1313;text-decoration:none">${d.email}</a>`,
      },
      { label: 'Looking for', value: d.type },
      d.details ? { label: 'Details', value: d.details } : null,
      d.timeline ? { label: 'Timeline', value: d.timeline } : null,
      { label: 'Locale', value: d.locale === 'is' ? 'Icelandic' : 'English' },
    ].filter(Boolean) as { label: string; value: string }[];

    const html = `
      <div style="font-family:Outfit,system-ui,sans-serif;max-width:480px;margin:0 auto;padding:32px 0">
        <div style="border-bottom:2px solid #bf1313;padding-bottom:16px;margin-bottom:24px">
          <span style="font-size:24px;font-weight:700;color:#272727">New inquiry</span>
        </div>
        <table style="width:100%;border-collapse:collapse">
          ${rows
            .map(
              (r) => `
            <tr>
              <td style="padding:8px 16px 8px 0;font-size:12px;font-weight:500;color:#696773;text-transform:uppercase;letter-spacing:0.05em;vertical-align:top;white-space:nowrap">${r.label}</td>
              <td style="padding:8px 0;font-size:15px;font-weight:300;color:#272727">${r.value}</td>
            </tr>`,
            )
            .join('')}
        </table>
        <div style="margin-top:32px;padding-top:16px;border-top:1px solid #eff1f3">
          <span style="font-size:11px;color:#696773">via benedikt.valdez.is/lets-go</span>
        </div>
      </div>
    `;

    await resend.emails.send({
      from: 'valdez.is <noreply@valdez.is>',
      to: 'benedikt@valdez.is',
      replyTo: d.email,
      subject: `New inquiry from ${d.name}`,
      html,
      text: rows.map((r) => `${r.label}: ${r.value}`).join('\n'),
    });

    if (process.env.NTFY_INQUIRY_URL) {
      try {
        const who = d.company ? `${d.name} (${d.company})` : d.name;
        await fetch(process.env.NTFY_INQUIRY_URL, {
          method: 'POST',
          headers: {
            Title: 'New inquiry',
            Priority: 'default',
            Tags: 'incoming_envelope',
            Click: 'mailto:benedikt@valdez.is',
          },
          body: `${who}: ${d.type}`,
        });
      } catch {
        // best-effort, never block submission
      }
    }

    return { success: true };
  } catch {
    return { success: false, error: 'Failed to submit' };
  }
}
