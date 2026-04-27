const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        accountNumber: true,
        balance: true,
        availableBalance: true,
        sentThisMonth: true,
        pendingAmount: true,
        currency: true,
        isVerified: true,
        createdAt: true
      },
      orderBy: { createdAt: 'desc' }
    });

    console.log(JSON.stringify(users, null, 2));
  } catch (error) {
    console.error('Error fetching users:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
