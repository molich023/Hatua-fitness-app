-- 1. Create Custom Types (Enums)
CREATE TYPE "tier" AS ENUM ('Msingi', 'Nguvu', 'Dhahabu');
CREATE TYPE "activity_type" AS ENUM ('Walking', 'Jogging', 'Cycling', 'Racing');

-- 2. Create Users Table (Includes 20pt Welcome Bonus)
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"full_name" text NOT NULL,
	"email" text NOT NULL UNIQUE,
	"phone" text NOT NULL,
	"password" text NOT NULL,
	"avatar" text DEFAULT 'Simba',
	"tier" "tier" DEFAULT 'Msingi',
	"points" integer DEFAULT 20, -- Your 20-point welcome bonus
	"referral_code" text NOT NULL UNIQUE,
	"referred_by" uuid,
	"created_at" timestamp DEFAULT now()
);

-- 3. Create Activities Table (Distance in Meters/KM)
CREATE TABLE IF NOT EXISTS "activities" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"user_id" uuid NOT NULL REFERENCES "users"("id"),
	"type" "activity_type" DEFAULT 'Walking',
	"distance_meters" integer NOT NULL,
	"distance_km" double precision NOT NULL,
	"is_outdoor" boolean DEFAULT true,
	"points_earned" integer NOT NULL,
	"timestamp" timestamp DEFAULT now()
);

-- 4. Create Subscriptions Table (KSH Payments)
CREATE TABLE IF NOT EXISTS "subscriptions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"user_id" uuid NOT NULL REFERENCES "users"("id"),
	"amount_ksh" integer NOT NULL, -- 100, 500, or 1000
	"expiry_date" timestamp NOT NULL,
	"is_active" boolean DEFAULT true,
	"payment_ref" text UNIQUE
);

-- 5. Add Foreign Key for Referrals
ALTER TABLE "users" ADD CONSTRAINT "users_referred_by_fkey" 
FOREIGN KEY ("referred_by") REFERENCES "users"("id") ON DELETE SET NULL;
