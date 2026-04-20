import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const email = "Danielhalltag@gmail.com";
  
  // Upsert to handle existing user
  const user = await prisma.user.upsert({
    where: { email: email.toLowerCase() },
    update: {},
    create: {
      email: email.toLowerCase(),
      phone: "+15550123456",
      password: "Password123", // Set a default password
      otp: null,
      firstName: "Daniel",
      lastName: "Halltag",
      middleName: "",
      dateOfBirth: new Date("1988-11-22"),
      gender: "Male",
      address: "456 Oak Avenue",
      city: "Chicago",
      state: "Illinois",
      country: "USA",
      ssn: "987654321",
      occupation: "Investment Analyst",
      employerName: "CMEF Bank",
      maritalStatus: "Married",
      accountNumber: "00246813579",
      accountType: "Savings",
      balance: 12500.50,
      currency: "USD",
      isVerified: true,
      kycLevel: "Level 3",
      profileImageUrl: "https://randomuser.me/api/portraits/men/32.jpg",
      hasPaidTransferFee: true,
    },
  });

  console.log(`✅ User seeded successfully: ${user.email}`);
  console.log(`Password is: Password123`);
  console.log(`Account Number is: ${user.accountNumber}`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
