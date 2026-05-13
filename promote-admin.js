const postgres = require('postgres');
require('dotenv').config({ path: '.env.local' });

async function promote(email) {
  const sql = postgres(process.env.DATABASE_URL, { prepare: false });
  try {
    console.log(`Promoting ${email} to admin...`);
    const result = await sql`UPDATE users SET role = 'admin' WHERE email = ${email} RETURNING id`;
    if (result.length > 0) {
      console.log(`Success! User ${email} is now an admin.`);
    } else {
      console.log(`User ${email} not found.`);
    }
  } catch (err) {
    console.error(err);
  } finally {
    await sql.end();
  }
}

const email = process.argv[2];
if (!email) {
  console.log("Usage: node promote-admin.js user@email.com");
  process.exit(1);
}

promote(email);
