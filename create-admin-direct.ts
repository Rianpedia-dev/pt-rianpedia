import { config } from "dotenv";
config({ path: ".env.local" });

import { db } from "./src/db";
import { users, accounts } from "./src/db/schema";
import { eq } from "drizzle-orm";
import { scryptSync, randomBytes } from "crypto";

async function hashPassword(password: string): Promise<string> {
  // Using Node.js built-in scrypt
  const salt = randomBytes(16).toString("hex");
  const derivedKey = scryptSync(password, salt, 64);
  return `${salt}:${derivedKey.toString("hex")}`;
}

async function createAdmin() {
  const email = "admin@rianpedia.id";
  const password = "adminpassword123";
  const name = "Admin Rianpedia";

  console.log("Checking if admin exists...");
  const existing = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (existing) {
    console.log("Admin already exists. Updating role to admin...");
    await db.update(users).set({ role: "admin" }).where(eq(users.id, existing.id));
    console.log("✅ Admin role updated successfully!");
    console.log("📧 Email: " + email);
    console.log("🔑 Password: " + password);
    return;
  }

  console.log("Creating admin account...");
  
  // Generate UUID untuk user
  const userId = crypto.randomUUID();
  
  // Insert ke users table
  await db.insert(users).values({
    id: userId,
    email,
    name,
    role: "admin",
    emailVerified: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  console.log("✅ Admin account created successfully!");
  console.log("📧 Email: " + email);
  console.log("🔑 Password: " + password);
  console.log("\n⚠️  NOTE: You may need to login via the app to create the Better Auth account entry.");
}

createAdmin().catch(console.error).finally(() => process.exit());
