const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function listUsers() {
  const users = await prisma.user.findMany({ select: { email: true } });
  console.log('Registered Users:', users);
  await prisma.$disconnect();
}

listUsers();
