import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const email = "myprivateemail00989@gmail.com";
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
      select: {
        email: true,
        otp: true,
      },
    });

    if (user) {
      console.log(`Email: ${user.email}, OTP: ${user.otp}`);
    } else {
      console.log(`User not found for email: ${email}`);
    }
  } catch (error) {
    console.error("Error fetching user:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
