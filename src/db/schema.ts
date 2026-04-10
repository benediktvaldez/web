import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';

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
