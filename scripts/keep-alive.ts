import { config } from "dotenv";
config({ path: ".env.local" });
import postgres from "postgres";

async function pingDatabase() {
  const connectionString = process.env.DATABASE_URL;
  
  if (!connectionString) {
    console.error("❌ DATABASE_URL is not defined");
    process.exit(1);
  }

  console.log("📡 Pinging database to keep Supabase active...");
  
  const sql = postgres(connectionString, { prepare: false });

  try {
    const result = await sql`SELECT 1 as ping`;
    if (result && result.length > 0) {
      console.log("✅ Database ping successful!");
    }
  } catch (error) {
    console.error("❌ Database ping failed:", error instanceof Error ? error.message : String(error));
    process.exit(1);
  } finally {
    await sql.end();
  }
}

pingDatabase();
