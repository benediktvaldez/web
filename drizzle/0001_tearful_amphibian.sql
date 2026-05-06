CREATE TABLE "newsletter_sends" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"subscriber_id" uuid NOT NULL,
	"issue_slug" text NOT NULL,
	"sent_at" timestamp DEFAULT now() NOT NULL,
	"resend_message_id" text
);
--> statement-breakpoint
CREATE TABLE "subscribers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"locale" text NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"confirm_token" text,
	"unsubscribe_token" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"confirmed_at" timestamp,
	"unsubscribed_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "newsletter_sends" ADD CONSTRAINT "newsletter_sends_subscriber_id_subscribers_id_fk" FOREIGN KEY ("subscriber_id") REFERENCES "public"."subscribers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "newsletter_sends_subscriber_issue_idx" ON "newsletter_sends" USING btree ("subscriber_id","issue_slug");--> statement-breakpoint
CREATE UNIQUE INDEX "subscribers_email_locale_idx" ON "subscribers" USING btree ("email","locale");