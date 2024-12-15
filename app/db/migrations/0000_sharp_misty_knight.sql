CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"date_of_birth" timestamp NOT NULL,
	"role" varchar(100) DEFAULT 'excursionist' NOT NULL,
	"auth_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_auth" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"phone" varchar(255),
	"phone_verified" boolean DEFAULT false,
	"email" varchar(255) NOT NULL,
	"email_verified" boolean DEFAULT false,
	"password" varchar(255) NOT NULL,
	"locale" varchar(10) NOT NULL,
	"created_on" timestamp DEFAULT now() NOT NULL,
	"last_login" timestamp,
	"logins" timestamp[] DEFAULT ARRAY[]::timestamp[] NOT NULL,
	"updates" timestamp[] DEFAULT ARRAY[]::timestamp[] NOT NULL,
	"twillio_locale" varchar(10),
	"phone_number" varchar(255),
	"country_code" varchar(2),
	"country_calling_code" varchar(5),
	"national_number" varchar(15),
	"international_number" varchar(255),
	"possible_countries" varchar(255),
	"is_valid" boolean DEFAULT false,
	"is_possible" boolean DEFAULT false,
	"uri" varchar(255),
	"type" varchar(50),
	CONSTRAINT "user_auth_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_auth_id_user_auth_id_fk" FOREIGN KEY ("auth_id") REFERENCES "public"."user_auth"("id") ON DELETE cascade ON UPDATE no action;