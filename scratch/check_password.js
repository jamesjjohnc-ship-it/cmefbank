const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const accountNumber = "00246813579";

  try {
    const user = await prisma.user.findUnique({
      where: { accountNumber: accountNumber },
      select: {
        id: true,
        email: true,
        password: true
      }
    });

    if (user) {
      console.log('User found:');
      console.log(JSON.stringify(user, null, 2));
    } else {
      console.log('User not found with account number:', accountNumber);
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
