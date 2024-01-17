import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  prisma.$disconnect();
}

main();
