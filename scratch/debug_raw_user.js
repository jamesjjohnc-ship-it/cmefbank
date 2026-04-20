const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function debugRawUser() {
  const email = 'purpleskyies01@gmail.com'.toLowerCase();
  const rawUsers = await prisma.$queryRaw`SELECT * FROM "User" WHERE LOWER(email) = ${email} LIMIT 1`;
  console.log('Raw User Object keys:', Object.keys(rawUsers[0]));
  console.log('Raw User Object values:', rawUsers[0]);
  await prisma.$disconnect();
}

debugRawUser();
