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
    await resend.emails.send({
      from: 'valdez.is <noreply@valdez.is>',
      to: 'hi@valdez.is',
      subject: `New inquiry from ${parsed.data.name}`,
      text: [
        `Name: ${parsed.data.name}`,
        `Email: ${parsed.data.email}`,
        parsed.data.company ? `Company: ${parsed.data.company}` : null,
        `Type: ${parsed.data.type}`,
        parsed.data.details ? `Details: ${parsed.data.details}` : null,
        parsed.data.timeline ? `Timeline: ${parsed.data.timeline}` : null,
        `Locale: ${parsed.data.locale}`,
      ]
        .filter(Boolean)
        .join('\n'),
    });

    return { success: true };
  } catch {
    return { success: false, error: 'Failed to submit' };
  }
}
