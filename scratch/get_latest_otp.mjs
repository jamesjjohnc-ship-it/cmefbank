import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    const users = await prisma.user.findMany({
      orderBy: { updatedAt: 'desc' },
      take: 3,
      select: { email: true, otp: true, updatedAt: true }
    });

    console.log("Recent OTP requests:");
    users.forEach(u => {
      console.log(`Email: ${u.email} | OTP: ${u.otp} | Updated: ${u.updatedAt}`);
    });
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
