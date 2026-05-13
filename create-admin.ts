import { auth } from "./src/lib/auth";
import { db } from "./src/db";
import { users } from "./src/db/schema";
import { eq } from "drizzle-orm";

async function createAdmin() {
  const email = "admin@rianpedia.id";
  const password = "adminpassword123";
  const name = "Admin Rianpedia";

  console.log("Checking if admin exists...");
  const existing = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (existing) {
    console.log("Admin already exists. Updating role...");
    await db.update(users).set({ role: "admin" }).where(eq(users.id, existing.id));
    console.log("Admin role updated!");
    return;
  }

  console.log("Creating admin account...");
  // Using better-auth server-side API to create user with password
  const user = await auth.api.signUpEmail({
    body: {
      email,
      password,
      name,
    },
  });

  if (user) {
    console.log("User created. Setting role to admin...");
    await db.update(users).set({ role: "admin" }).where(eq(users.email, email));
    console.log("Admin account created successfully!");
    console.log("Email: " + email);
    console.log("Password: " + password);
  }
}

createAdmin().catch(console.error).finally(() => process.exit());
