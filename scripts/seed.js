const { db } = require("@vercel/postgres");

async function seedBlogs(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS blogs (
        id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        name VARCHAR(255) NOT NULL UNIQUE
      )
    `;

    console.log("Created blogs table");

    return createTable;
  } catch (error) {
    console.error("Error creating blogs:", error);
    throw error;
  }
}

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255)
      )
    `;

    console.log("Created users table");

    return createTable;
  } catch (error) {
    console.error("Error creating users:", error);
    throw error;
  }
}

async function seedComments(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS comments (
        id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
        post_id uuid FOREIGN KEY REFERENCES posts(id),
        author uuid FOREIGN KEY REFERENCES users(id),
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        content TEXT NOT NULL
      )
    `;
  } catch (error) {
    console.error("Error creating comments:", error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedBlogs(client);
  await seedUsers(client);
  await seedComments(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err,
  );
});
