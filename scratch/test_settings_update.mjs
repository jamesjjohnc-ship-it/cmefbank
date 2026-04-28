import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    const email = "myprivateemail00989@gmail.com";
    const user = await prisma.user.findUnique({ where: { email } });
    
    if (!user) {
      console.log("User not found");
      return;
    }

    const payload = {
      firstName: user.firstName || "Daniel",
      lastName: user.lastName || "Halltag",
      middleName: "",
      phone: user.phone || "",
      email: user.email,
      address: "",
      city: "",
      state: "",
      country: "",
      gender: "Male",
      dateOfBirth: null,
      occupation: "",
      employerName: "",
      maritalStatus: "",
      ssn: "123456789",
      hasPaidTransferFee: false,
      profileImageUrl: user.profileImageUrl || ""
    };

    console.log("Attempting update with payload:", payload);

    const updated = await prisma.user.update({
      where: { email },
      data: payload
    });

    console.log("Update successful!");
  } catch (err) {
    console.error("Update failed:", err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
