import { config } from "dotenv";
config({ path: ".env.local" });
import postgres from "postgres";
import { randomUUID } from "crypto";

const connectionString = process.env.DATABASE_URL!;
console.log("Connecting to:", connectionString.substring(0, 50) + "...");

const sql = postgres(connectionString, { prepare: false });

async function createAdmin() {
  const email = "admin@rianpedia.id";
  const password = "adminpassword123";
  const name = "Admin Rianpedia";

  try {
    // Check if user exists
    const existing = await sql`SELECT * FROM users WHERE email = ${email}`;
    
    if (existing.length > 0) {
      console.log("✅ Admin already exists. Updating role to admin...");
      await sql`UPDATE users SET role = 'admin', updated_at = NOW() WHERE email = ${email}`;
      console.log("✅ Admin role updated successfully!");
    } else {
      console.log("Creating admin account...");
      const userId = randomUUID();
      
      await sql`
        INSERT INTO users (id, email, name, role, email_verified, created_at, updated_at)
        VALUES (${userId}, ${email}, ${name}, 'admin', false, NOW(), NOW())
      `;
      
      console.log("✅ Admin account created successfully!");
    }
    
    console.log("\n📧 Email: " + email);
    console.log("🔑 Password: adminpassword123");
    console.log("\n⚠️  NOTE: If you haven't registered yet via the app, you need to register first at /auth/register");
    console.log("   Then run this script again to set the admin role.");
    
  } catch (error) {
    console.error("❌ Error:", error instanceof Error ? error.message : String(error));
  } finally {
    await sql.end();
  }
}

createAdmin();
