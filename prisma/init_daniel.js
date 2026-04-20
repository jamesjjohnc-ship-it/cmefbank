import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const email = "danielhalltag@gmail.com";
  
  // Use raw SQL to bypass the out-of-date Prisma client fields
  try {
    const result = await prisma.$executeRaw`
      UPDATE "User"
      SET balance = 9912458.37,
          "availableBalance" = 912458.37,
          "sentThisMonth" = 33250.00,
          "pendingAmount" = 3000.00,
          "isVerified" = true,
          "firstName" = 'Daniel',
          "lastName" = 'Halltag',
          "password" = 'Password123'
      WHERE LOWER(email) = ${email}
    `;

    if (result === 0) {
      console.log("No user found with that email. Creating new user via raw SQL...");
      await prisma.$executeRaw`
        INSERT INTO "User" (email, phone, password, "firstName", "lastName", balance, "availableBalance", "sentThisMonth", "pendingAmount", "isVerified", "accountNumber", currency, "kycLevel")
        VALUES (${email}, '+15550123456', 'Password123', 'Daniel', 'Halltag', 9912458.37, 912458.37, 33250.00, 3000.00, true, '00246813579', 'USD', 'Level 3')
      `;
      console.log("✅ User created.");
    } else {
      console.log("✅ User metrics updated.");
    }
  } catch (err) {
    console.error("❌ Raw SQL Error:", err);
  }
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
