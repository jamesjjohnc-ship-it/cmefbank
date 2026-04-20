const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkUser() {
  const email = 'purplekyies01@gmail.com'.toLowerCase();
  const user = await prisma.user.findFirst({ where: { email } });
  console.log('User found:', user);
  await prisma.$disconnect();
}

checkUser();
