const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkData() {
  const email = 'purpleskyies01@gmail.com'.toLowerCase();
  const user = await prisma.user.findFirst({ where: { email } });
  
  if (!user) {
    console.log('User NOT found: purpleskyies01@gmail.com');
  } else {
    console.log('User found:', {
      email: user.email,
      balance: user.balance,
      availableBalance: user.availableBalance,
      id: user.id
    });
    
    const txCount = await prisma.transaction.count({ where: { userId: user.id } });
    console.log('Transaction count for user:', txCount);
  }
  
  await prisma.$disconnect();
}

checkData();
