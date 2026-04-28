import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    const users = await prisma.user.findMany({
      select: {
        email: true,
        password: true,
      },
    });

    console.log("Found " + users.length + " users.");
    users.forEach((u, i) => {
      console.log(`User ${i+1}: Email: ${u.email}, Password: ${u.password}`);
    });
  } catch (error) {
    console.error("Error fetching users:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
