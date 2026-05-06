CREATE TABLE "unsubscribe_feedback" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"locale" text NOT NULL,
	"reason" text NOT NULL,
	"reason_other" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "unsubscribe_feedback_email_locale_idx" ON "unsubscribe_feedback" USING btree ("email","locale");