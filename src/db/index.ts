import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL!;

// Singleton pattern untuk menghindari koneksi ganda akibat HMR Next.js di development
declare global {
  var postgresSqlClient: postgres.Sql<{}> | undefined;
}

const client = global.postgresSqlClient || postgres(connectionString, { prepare: false, max: 1 });

if (process.env.NODE_ENV !== "production") {
  global.postgresSqlClient = client;
}

export const db = drizzle(client, { schema });
