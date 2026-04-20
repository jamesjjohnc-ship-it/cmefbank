import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function checkOtp() {
  const user = await prisma.user.findFirst({
    where: { email: { equals: "rvsanchez255@gmail.com", mode: "insensitive" } }
  });

  if (!user) {
    console.log("No user found with email rvsanchez255@gmail.com");
  } else {
    console.log(`User ID: ${user.id}`);
    console.log(`Name: ${user.firstName} ${user.lastName}`);
    console.log(`Email: ${user.email}`);
    console.log(`Account Number: ${user.accountNumber}`);
    console.log(`Current OTP in DB: ${user.otp}`);
  }
}

checkOtp().finally(() => prisma.$disconnect());
