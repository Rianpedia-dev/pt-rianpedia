import { config } from "dotenv";
config({ path: ".env.local" });

console.log("DATABASE_URL:", process.env.DATABASE_URL);
console.log("First 50 chars:", process.env.DATABASE_URL?.substring(0, 50));
