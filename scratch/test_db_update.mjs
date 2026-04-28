import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    console.log("Connecting to the database...");
    const user = await prisma.user.findFirst();
    if (!user) {
      console.log("No user found.");
      return;
    }
    console.log("Read successful. Attempting update...");
    
    // We update something harmless, like same value
    const updated = await prisma.user.update({
      where: { id: user.id },
      data: { updatedAt: new Date() }
    });
    console.log("Update successful!", updated.email);
  } catch (err) {
    console.error("Database connection error:", err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
