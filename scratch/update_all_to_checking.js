const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Updating all users to accountType: Checking...');
    const result = await prisma.user.updateMany({
      data: {
        accountType: 'Checking'
      }
    });
    console.log(`Successfully updated ${result.count} users.`);
  } catch (error) {
    console.error('Error updating account types:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
