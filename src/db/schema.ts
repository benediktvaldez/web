import { pgTable, uuid, text, timestamp, uniqueIndex } from 'drizzle-orm/pg-core';

export const inquiries = pgTable('inquiries', {
  id: uuid('id').primaryKey().defaultRandom(),
  type: text('type').notNull(),
  details: text('details'),
  timeline: text('timeline'),
  name: text('name').notNull(),
  email: text('email').notNull(),
  company: text('company'),
  locale: text('locale').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const subscribers = pgTable(
  'subscribers',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    email: text('email').notNull(),
    locale: text('locale').notNull(),
    status: text('status').notNull().default('pending'),
    confirmToken: text('confirm_token'),
    unsubscribeToken: text('unsubscribe_token').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    confirmedAt: timestamp('confirmed_at'),
    unsubscribedAt: timestamp('unsubscribed_at'),
  },
  (table) => [uniqueIndex('subscribers_email_locale_idx').on(table.email, table.locale)],
);

export const newsletterSends = pgTable(
  'newsletter_sends',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    subscriberId: uuid('subscriber_id')
      .notNull()
      .references(() => subscribers.id, { onDelete: 'cascade' }),
    issueSlug: text('issue_slug').notNull(),
    sentAt: timestamp('sent_at').notNull().defaultNow(),
    resendMessageId: text('resend_message_id'),
  },
  (table) => [
    uniqueIndex('newsletter_sends_subscriber_issue_idx').on(table.subscriberId, table.issueSlug),
  ],
);

export const unsubscribeFeedback = pgTable(
  'unsubscribe_feedback',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    email: text('email').notNull(),
    locale: text('locale').notNull(),
    reason: text('reason').notNull(),
    reasonOther: text('reason_other'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (table) => [uniqueIndex('unsubscribe_feedback_email_locale_idx').on(table.email, table.locale)],
);
