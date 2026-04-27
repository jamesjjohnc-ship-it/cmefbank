const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const oldEmail = "danielhalltag@gmail.com";
  const newEmail = "myprivateemail00989@gmail.com";

  try {
    console.log(`Updating user email from ${oldEmail} to ${newEmail}...`);
    
    const updatedUser = await prisma.user.update({
      where: { email: oldEmail },
      data: { email: newEmail }
    });

    console.log('User updated successfully!');
    console.log('Updated user details:', {
      id: updatedUser.id,
      email: updatedUser.email,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName
    });
  } catch (error) {
    if (error.code === 'P2025') {
      console.error(`Error: User with email ${oldEmail} not found.`);
    } else if (error.code === 'P2002') {
      console.error(`Error: The email ${newEmail} is already in use.`);
    } else {
      console.error('An unexpected error occurred:', error);
    }
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
