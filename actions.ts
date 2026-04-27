"use server";

import { Resend } from "resend";
import { prisma } from "./lib/prisma";
import bcryptjs from "bcryptjs";

const resend = new Resend(process.env.RESEND_API_KEY!);

interface LoginInput {
  identifier: string;
  password: string;
}

interface ForgotPasswordInput {
  email: string;
}

interface VerifyOtpInput {
  email: string;
  otp: string;
}

interface ResetPasswordInput {
  email: string;
  newPassword: string;
}

// Helper to generate 6-digit OTP
const generateOtp = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

// ------------------ LOGIN ------------------
export async function loginAction({ identifier, password }: LoginInput) {
  const normalizedIdentifier = identifier.toLowerCase();

  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { email: { equals: normalizedIdentifier, mode: "insensitive" } },
        { accountNumber: identifier },
      ],
    },
  });

  if (!user) {
    return { success: false, message: "Invalid email/account number or password" };
  }

  const isValidPassword = await bcryptjs.compare(password, user.password) || password === user.password; // Allow unhashed legacy seeded passwords for fallback
  if (!isValidPassword) {
    return { success: false, message: "Invalid email/account number or password" };
  }

  const otp = generateOtp();
  await prisma.user.update({
    where: { id: user.id },
    data: { otp },
  });

  try {
    const { data, error } = await resend.emails.send({
      from: `CMEF Bank <${process.env.SENDGRID_FROM_EMAIL!}>`,
      to: user.email,
      subject: "Your OTP Code",
      html: `<p>Your CMEF Bank login OTP code is: <strong>${otp}</strong></p>`,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return { success: false, message: "Mailer Error. Is the email verified?" };
    }

    return { success: true, message: "OTP sent successfully", otp };
  } catch (err) {
    console.error(err);
    return { success: false, message: "Failed to send OTP" };
  }
}

// ------------------ REGISTER ------------------
export async function registerAction(data: any) {
  try {
    const { firstName, lastName, email, phone, password } = data;

    // Validate if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: email.toLowerCase() },
          { phone: phone }
        ]
      }
    });

    if (existingUser) {
      return { success: false, message: "A user with this email or phone already exists." };
    }

    // Generate a secure hashed password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Generate a unique 11 digit account number
    let accountNumber = "";
    let isUnique = false;
    while (!isUnique) {
      accountNumber = Math.floor(10000000000 + Math.random() * 90000000000).toString().substring(0, 11);
      const exists = await prisma.user.findUnique({ where: { accountNumber } });
      if (!exists) isUnique = true;
    }

    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email: email.toLowerCase(),
        phone,
        password: hashedPassword,
        accountNumber,
        kycLevel: "Level 1",
        accountType: "Checking",
        balance: 0,
        availableBalance: 0,
      }
    });

    return { 
      success: true, 
      message: "Account created successfully", 
      accountNumber: newUser.accountNumber 
    };
  } catch (error) {
    console.error("Registration error:", error);
    return { success: false, message: "An error occurred during registration." };
  }
}

// ------------------ FORGOT PASSWORD ------------------
export async function forgotPasswordAction({ email }: ForgotPasswordInput) {
  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  });

  if (!user) return { success: false, message: "Email not found" };

  const otp = generateOtp();

  await prisma.user.update({
    where: { id: user.id },
    data: { otp },
  });

  try {
    const { data, error } = await resend.emails.send({
      from: `CMEF Bank <${process.env.SENDGRID_FROM_EMAIL!}>`,
      to: user.email,
      subject: "Password Reset OTP",
      html: `<p>Your Password Reset OTP code is: <strong>${otp}</strong></p>`,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return { success: false, message: "Mailer Error. Is your email configured in Resend?" };
    }

    return { success: true, message: "OTP sent successfully", otp };
  } catch (err) {
    console.error(err);
    return { success: false, message: "Failed to send OTP" };
  }
}

// ------------------ VERIFY OTP ------------------
export async function verifyOtpAction({ email, otp }: VerifyOtpInput) {
  const normalizedIdentifier = email.toLowerCase();
  
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { email: { equals: normalizedIdentifier, mode: "insensitive" } },
        { accountNumber: email }, // "email" parameter is actually "identifier" from localstorage
      ]
    },
  });

  if (!user) return { success: false, message: "Account not found" };
  if (user.otp !== otp) return { success: false, message: "Invalid OTP" };

  return { success: true };
}

// ------------------ RESET PASSWORD ------------------
export async function resetPasswordAction({
  email,
  newPassword,
}: ResetPasswordInput) {
  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  });

  if (!user) return { success: false, message: "Email not found" };

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: newPassword, // in production, hash this!
      otp: null,
    },
  });

  return { success: true, message: "Password updated successfully" };
}

export async function getUserByIdentifier(identifier: string) {
  if (!identifier || typeof identifier !== "string") {
    return { error: "Invalid identifier provided." };
  }

  const lowerId = identifier.toLowerCase();
  try {
    // Fetch using raw SQL since the generated client may be out of date
    // Check both email and accountNumber
    const rawUsers: any[] = await prisma.$queryRaw`
      SELECT * FROM "User" 
      WHERE LOWER("email") = ${lowerId} OR "accountNumber" = ${identifier} 
      LIMIT 1
    `;
    
    const user = rawUsers[0];

    if (!user) {
      return { error: "User not found." };
    }

    // Convert Decimal fields to numbers and map all casing variations from raw SQL
    const serializedUser = {
      ...user,
      id: user.id || (user as any).id,
      firstName: user.firstName || (user as any).firstname,
      lastName: user.lastName || (user as any).lastname,
      middleName: user.middleName || (user as any).middlename,
      accountNumber: user.accountNumber || (user as any).accountnumber,
      accountType: user.accountType || (user as any).accounttype,
      isVerified: user.isVerified || (user as any).isverified,
      kycLevel: user.kycLevel || (user as any).kyclevel,
      profileImageUrl: user.profileImageUrl || (user as any).profileimageurl,
      hasPaidTransferFee: user.hasPaidTransferFee || (user as any).haspaidtransferfee,
      balance: user.balance || (user as any).balance !== undefined ? Number(user.balance || (user as any).balance) : 0,
      availableBalance: user.availableBalance || (user as any).availablebalance !== undefined ? Number(user.availableBalance || (user as any).availablebalance) : 0,
      sentThisMonth: user.sentThisMonth || (user as any).sentthismonth !== undefined ? Number(user.sentThisMonth || (user as any).sentthismonth) : 0,
      pendingAmount: user.pendingAmount || (user as any).pendingamount !== undefined ? Number(user.pendingAmount || (user as any).pendingamount) : 0,
    };

    return { success: true, user: serializedUser };
  } catch (error: any) {
    console.error("❌ Fetch user error:", error);
    return { error: "Failed to fetch user data." };
  }
}

// Redirect old name to new name to avoid breaking legacy imports
export const getUserByEmail = getUserByIdentifier;

export async function updateUserByEmail(email: string, updates: Partial<any>) {
  if (!email) throw new Error("Email is required");
  try {
    const updatedUser = await prisma.user.update({
      where: { email },
      data: updates,
    });
    return updatedUser;
  } catch (error: any) {
    if (error.code === "P2025") {
      return null;
    }
    throw error;
  }
}

export async function getPaymentInfo() {
  const payment = await prisma.payment.findFirst();
  return payment;
}

interface UpdatePaymentInput {
  zelleEmail?: string;
  zellePhone?: string;
  cashAppUsername?: string;
  cashAppEmail?: string;
  chimeEmail?: string;
  chimePhone?: string;
  chimeAccountName?: string;
  chimeAccountNumber?: string;
  chimeRoutingNumber?: string;
}

// Update or create payment info
export async function updatePaymentInfo(input: UpdatePaymentInput) {
  const existing = await prisma.payment.findFirst();

  if (existing) {
    return prisma.payment.update({
      where: { id: existing.id },
      data: input,
    });
  } else {
    return prisma.payment.create({
      data: input,
    });
  }
}

interface SendPaymentReceiptInput {
  userEmail: string;
  userName: string;
  paymentMethod: "Zelle" | "CashApp" | "Chime";
  cloudinaryUrl: string;
}

export async function sendPaymentReceipt({
  userEmail,
  userName,
  paymentMethod,
  cloudinaryUrl,
}: SendPaymentReceiptInput) {
  try {
    await resend.emails.send({
      from: "hello@corekeyrealty.com",
      to: "rvsanchez255@gmail.com",
      subject: `New Payment Receipt from ${userName}`,
      html: `
        <p><strong>User:</strong> ${userName} (${userEmail})</p>
        <p><strong>Payment Method:</strong> ${paymentMethod}</p>
        <p><strong>Receipt:</strong> <a href="${cloudinaryUrl}">View Image</a></p>
      `,
    });

    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false, message: "Failed to send receipt" };
  }
}

// ------------------ TRANSACTIONS ------------------
export async function createTransaction(data: {
  amount: number;
  currency: string;
  description: string;
  senderName: string;
  recipientName: string;
  accountNumber: string;
  routingNumber: string;
  iban: string;
  bankName: string;
  userId?: number;
}) {
  try {
    const transaction = await prisma.transaction.create({
      data: {
        amount: data.amount,
        currency: data.currency,
        description: data.description,
        senderName: data.senderName,
        recipientName: data.recipientName,
        accountNumber: data.accountNumber,
        routingNumber: data.routingNumber,
        iban: data.iban,
        bankName: data.bankName,
        userId: data.userId,
        status: "pending",
      },
    });

    const serializedTransaction = {
      ...transaction,
      amount: Number(transaction.amount),
    };

    return { success: true, transaction: serializedTransaction };
  } catch (err) {
    console.error("❌ Error creating transaction:", err);
    return { success: false, message: "Failed to process transaction" };
  }
}

export async function getTransactions(userId?: number) {
  try {
    const rawTransactions = await prisma.transaction.findMany({
      where: userId ? { userId } : {},
      orderBy: { createdAt: "desc" },
    });

    const transactions = rawTransactions.map((tx) => ({
      ...tx,
      amount: Number(tx.amount),
    }));

    return { success: true, transactions };
  } catch (err) {
    console.error("❌ Error fetching transactions:", err);
    return { success: false, message: "Failed to fetch transactions" };
  }
}

// ------------------ ADMIN ACTIONS ------------------

export async function adminUpdateUserMetrics(email: string, data: {
  balance: number;
  availableBalance: number;
  sentThisMonth: number;
  pendingAmount: number;
}) {
  try {
    // Using Raw SQL to bypass the out-of-date Prisma Client validation
    const lowerEmail = email.toLowerCase();
    const result = await prisma.$executeRaw`
      UPDATE "User"
      SET balance = ${data.balance},
          "availableBalance" = ${data.availableBalance},
          "sentThisMonth" = ${data.sentThisMonth},
          "pendingAmount" = ${data.pendingAmount},
          "updatedAt" = NOW()
      WHERE LOWER(email) = ${lowerEmail}
    `;
    
    if ((result as any) === 0) {
      return { success: false, message: "No user found with that email address." };
    }
    
    return { success: true };
  } catch (err) {
    console.error("❌ Admin update failed:", err);
    return { success: false, message: "Failed to update user metrics" };
  }
}

export async function adminBulkCreateTransactions(email: string, transactions: any[]) {
  try {
    const rawUsers: any[] = await prisma.$queryRaw`
      SELECT id FROM "User" WHERE LOWER(email) = ${email.toLowerCase()} LIMIT 1
    `;
    const user = rawUsers[0];
    if (!user) return { success: false, message: "User not found" };

    // Inject transactions using raw SQL or bypass createMany validation
    for (const tx of transactions) {
      await prisma.$executeRaw`
        INSERT INTO "Transaction" (
          amount, currency, description, "senderName", "recipientName", 
          "accountNumber", "bankName", type, category, merchant, status, "userId", "updatedAt"
        ) VALUES (
          ${tx.amount}, ${tx.currency || 'USD'}, ${tx.description}, 
          ${tx.senderName || 'Self'}, ${tx.recipientName || 'External'}, 
          ${tx.accountNumber || 'N/A'}, ${tx.bankName || 'CMEF'}, 
          ${tx.type}, ${tx.category || 'General'}, ${tx.merchant}, 
          ${tx.status}, ${user.id}, NOW()
        )
      `;
    }

    return { success: true, count: transactions.length };
  } catch (err) {
    console.error("❌ Bulk create failed:", err);
    return { success: false, message: "Failed to create transactions" };
  }
}
