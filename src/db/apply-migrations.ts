import postgres from "postgres";
import fs from "fs";
import path from "path";
import "dotenv/config";

const connectionString = process.env.DATABASE_URL!;
const sql = postgres(connectionString, { prepare: false });

async function applyMigrations() {
  console.log("🚀 Applying migrations manually (CLEAN START)...");
  
  try {
    // Drop existing tables to ensure clean schema update
    // Order matters for foreign keys, but we'll try to drop them all
    console.log("  - Dropping existing tables for a clean start...");
    await sql.unsafe(`
      DROP TABLE IF EXISTS "ai_recommendation_logs" CASCADE;
      DROP TABLE IF EXISTS "project_assets" CASCADE;
      DROP TABLE IF EXISTS "revision_tickets" CASCADE;
      DROP TABLE IF EXISTS "messages" CASCADE;
      DROP TABLE IF EXISTS "invoices" CASCADE;
      DROP TABLE IF EXISTS "project_milestones" CASCADE;
      DROP TABLE IF EXISTS "projects" CASCADE;
      DROP TABLE IF EXISTS "client_profiles" CASCADE;
      DROP TABLE IF EXISTS "portfolios" CASCADE;
      DROP TABLE IF EXISTS "services" CASCADE;
      DROP TABLE IF EXISTS "testimonials" CASCADE;
      DROP TABLE IF EXISTS "contact_submissions" CASCADE;
      DROP TABLE IF EXISTS "users" CASCADE;
    `);
  } catch (e: any) {
    console.log("    ⚠️ Warning while dropping tables:", e.message);
  }

  const migrationDir = path.join(process.cwd(), "drizzle");
  const files = fs.readdirSync(migrationDir).filter(f => f.endsWith(".sql")).sort();
  
  for (const file of files) {
    console.log(`  - Running ${file}...`);
    const content = fs.readFileSync(path.join(migrationDir, file), "utf8");
    
    const statements = content.split("--> statement-breakpoint");
    
    for (let statement of statements) {
      statement = statement.trim();
      if (!statement) continue;
      
      try {
        await sql.unsafe(statement);
      } catch (err: any) {
        if (err.message.includes("already exists")) {
          console.log(`    ⚠️  Skipped (already exists): ${statement.substring(0, 50)}...`);
        } else {
          console.error(`    ❌ Error in ${file}:`, err.message);
          console.error(`    Full statement: ${statement}`);
        }
      }
    }
  }
  
  console.log("✅ Migrations applied!");
  process.exit(0);
}

applyMigrations();
