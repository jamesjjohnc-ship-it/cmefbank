const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const accountNumber = "00246813579";

  try {
    const user = await prisma.user.findUnique({
      where: { accountNumber: accountNumber },
      select: {
        email: true,
        otp: true
      }
    });

    if (user) {
      console.log(`User: ${user.email}`);
      console.log(`Current OTP: ${user.otp || 'No OTP generated'}`);
    } else {
      console.log('User not found');
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
