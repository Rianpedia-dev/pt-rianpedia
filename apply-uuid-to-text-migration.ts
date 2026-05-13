import { config } from "dotenv";
config({ path: ".env.local" });
import postgres from "postgres";

const connectionString = process.env.DATABASE_URL!;
const sql = postgres(connectionString, { prepare: false });

async function applyMigration() {
  console.log("Applying migration to change users.id from uuid to text...");
  
  try {
    // Step 1: Drop all foreign key constraints
    console.log("Step 1: Dropping foreign key constraints...");
    
    await sql`ALTER TABLE sessions DROP CONSTRAINT IF EXISTS sessions_user_id_users_id_fk`;
    await sql`ALTER TABLE accounts DROP CONSTRAINT IF EXISTS accounts_user_id_users_id_fk`;
    await sql`ALTER TABLE client_profiles DROP CONSTRAINT IF EXISTS client_profiles_user_id_users_id_fk`;
    await sql`ALTER TABLE projects DROP CONSTRAINT IF EXISTS projects_client_id_users_id_fk`;
    await sql`ALTER TABLE projects DROP CONSTRAINT IF EXISTS projects_assigned_developer_id_users_id_fk`;
    await sql`ALTER TABLE messages DROP CONSTRAINT IF EXISTS messages_sender_id_users_id_fk`;
    await sql`ALTER TABLE revision_tickets DROP CONSTRAINT IF EXISTS revision_tickets_submitted_by_id_users_id_fk`;
    await sql`ALTER TABLE project_assets DROP CONSTRAINT IF EXISTS project_assets_uploaded_by_id_users_id_fk`;
    await sql`ALTER TABLE ai_recommendation_logs DROP CONSTRAINT IF EXISTS ai_recommendation_logs_user_id_users_id_fk`;
    console.log("✅ Dropped all foreign key constraints");
    
    // Step 2: Change users.id from uuid to text
    console.log("Step 2: Changing users.id from UUID to TEXT...");
    await sql`ALTER TABLE users ALTER COLUMN id TYPE TEXT`;
    console.log("✅ Updated users.id to TEXT");
    
    // Step 3: Update all foreign key columns
    console.log("Step 3: Updating foreign key columns...");
    
    await sql`ALTER TABLE sessions ALTER COLUMN user_id TYPE TEXT`;
    await sql`ALTER TABLE accounts ALTER COLUMN user_id TYPE TEXT`;
    await sql`ALTER TABLE client_profiles ALTER COLUMN user_id TYPE TEXT`;
    await sql`ALTER TABLE projects ALTER COLUMN client_id TYPE TEXT`;
    await sql`ALTER TABLE projects ALTER COLUMN assigned_developer_id TYPE TEXT`;
    await sql`ALTER TABLE messages ALTER COLUMN sender_id TYPE TEXT`;
    await sql`ALTER TABLE revision_tickets ALTER COLUMN submitted_by_id TYPE TEXT`;
    await sql`ALTER TABLE project_assets ALTER COLUMN uploaded_by_id TYPE TEXT`;
    await sql`ALTER TABLE ai_recommendation_logs ALTER COLUMN user_id TYPE TEXT`;
    console.log("✅ Updated all foreign key columns to TEXT");
    
    // Step 4: Re-add foreign key constraints
    console.log("Step 4: Re-adding foreign key constraints...");
    
    await sql`ALTER TABLE sessions ADD CONSTRAINT sessions_user_id_users_fk FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE`;
    await sql`ALTER TABLE accounts ADD CONSTRAINT accounts_user_id_users_fk FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE`;
    await sql`ALTER TABLE client_profiles ADD CONSTRAINT client_profiles_user_id_users_fk FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE`;
    await sql`ALTER TABLE projects ADD CONSTRAINT projects_client_id_users_fk FOREIGN KEY (client_id) REFERENCES users(id) ON DELETE CASCADE`;
    await sql`ALTER TABLE projects ADD CONSTRAINT projects_assigned_developer_id_users_fk FOREIGN KEY (assigned_developer_id) REFERENCES users(id)`;
    await sql`ALTER TABLE messages ADD CONSTRAINT messages_sender_id_users_fk FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE`;
    await sql`ALTER TABLE revision_tickets ADD CONSTRAINT revision_tickets_submitted_by_id_users_fk FOREIGN KEY (submitted_by_id) REFERENCES users(id) ON DELETE CASCADE`;
    await sql`ALTER TABLE project_assets ADD CONSTRAINT project_assets_uploaded_by_id_users_fk FOREIGN KEY (uploaded_by_id) REFERENCES users(id) ON DELETE CASCADE`;
    await sql`ALTER TABLE ai_recommendation_logs ADD CONSTRAINT ai_recommendation_logs_user_id_users_fk FOREIGN KEY (user_id) REFERENCES users(id)`;
    console.log("✅ Re-added all foreign key constraints");
    
    console.log("\n🎉 Migration completed successfully!");
    
  } catch (error) {
    console.error("❌ Error applying migration:", error.message);
    console.error(error);
  } finally {
    await sql.end();
  }
}

applyMigration();
