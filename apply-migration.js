const postgres = require('postgres');
require('dotenv').config({ path: '.env.local' });

const sql = postgres(process.env.DATABASE_URL, { prepare: false });

async function run() {
  try {
    console.log('Applying migration...');
    // Split by --> statement-breakpoint
    const statements = [
      `CREATE TABLE IF NOT EXISTS "accounts" (
        "id" text PRIMARY KEY NOT NULL,
        "account_id" text NOT NULL,
        "provider_id" text NOT NULL,
        "user_id" uuid NOT NULL,
        "access_token" text,
        "refresh_token" text,
        "id_token" text,
        "access_token_expires_at" timestamp,
        "refresh_token_expires_at" timestamp,
        "scope" text,
        "password" text,
        "created_at" timestamp NOT NULL,
        "updated_at" timestamp NOT NULL
      )`,
      `CREATE TABLE IF NOT EXISTS "sessions" (
        "id" text PRIMARY KEY NOT NULL,
        "expires_at" timestamp NOT NULL,
        "token" text NOT NULL,
        "created_at" timestamp NOT NULL,
        "updated_at" timestamp NOT NULL,
        "ip_address" text,
        "user_agent" text,
        "user_id" uuid NOT NULL,
        CONSTRAINT "sessions_token_unique" UNIQUE("token")
      )`,
      `CREATE TABLE IF NOT EXISTS "verifications" (
        "id" text PRIMARY KEY NOT NULL,
        "identifier" text NOT NULL,
        "value" text NOT NULL,
        "expires_at" timestamp NOT NULL,
        "created_at" timestamp,
        "updated_at" timestamp
      )`,
      `ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "email_verified" boolean DEFAULT false NOT NULL`,
      `ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "image" text`,
      `ALTER TABLE "accounts" DROP CONSTRAINT IF EXISTS "accounts_user_id_users_id_fk"`,
      `ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action`,
      `ALTER TABLE "sessions" DROP CONSTRAINT IF EXISTS "sessions_user_id_users_id_fk"`,
      `ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action`
    ];

    for (const s of statements) {
      await sql.unsafe(s);
    }
    console.log('Migration applied successfully!');
  } catch (err) {
    console.error('Migration failed:', err);
  } finally {
    await sql.end();
  }
}

run();
