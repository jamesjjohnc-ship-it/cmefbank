const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Connecting to database...');
    await prisma.$connect();
    console.log('Connected successfully!');
    
    const userCount = await prisma.user.count();
    console.log(`Number of users in database: ${userCount}`);
    
    const lastUser = await prisma.user.findFirst({
      orderBy: { createdAt: 'desc' }
    });
    
    if (lastUser) {
      console.log('Database is working. Latest user email:', lastUser.email);
    } else {
      console.log('Database is working, but no users found.');
    }
  } catch (error) {
    console.error('Error connecting to database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
