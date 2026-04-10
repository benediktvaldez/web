CREATE TABLE "inquiries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" text NOT NULL,
	"details" text,
	"timeline" text,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"company" text,
	"locale" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
