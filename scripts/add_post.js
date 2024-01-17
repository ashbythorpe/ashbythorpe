const { db } = require("@vercel/postgres");
const readline = require("readline");

function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) =>
    rl.question(query, (ans) => {
      rl.close();
      resolve(ans);
    }),
  );
}

async function addPost(client, name, title, description) {
  try {
    await client.sql`
      INSERT INTO posts (name, title, description)
      VALUES (${name}, ${title}, ${description})
    `;

    console.log("Added post");

    return;
  } catch (error) {
    console.error("Error adding post:", error);
    throw error;
  }
}

async function main() {
  const { name, title, description } = process.argv.slice(2);

  console.log(`Name: ${name}\nTitle: ${title}\nDescription: ${description}`);

  answer = await askQuestion("Is this correct? (y/n): ");

  if (answer.toLowerCase() !== "y") {
    process.exit(0);
  }

  const client = await db.connect();

  await addPost(client, name, title, description);

  await client.end();
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err,
  );
});
