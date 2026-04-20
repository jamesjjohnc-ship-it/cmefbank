import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const emailToTest = "emmanuelar35@gmail.com";
const emailFrom = process.env.SENDGRID_FROM_EMAIL || "no-reply@cmefgroup.com";

console.log(`Starting email test...`);
console.log(`Using API Key starting with: ${process.env.RESEND_API_KEY?.substring(0, 10)}...`);
console.log(`Sending FROM: ${emailFrom}`);
console.log(`Sending TO: ${emailToTest}`);

async function runTest() {
  try {
    const { data, error } = await resend.emails.send({
      from: `CMEF Bank <${emailFrom}>`,
      to: emailToTest,
      subject: "Test Email from CMEF Banking Platform",
      html: "<p>If you are reading this, the Resend integration works flawlessly.</p>",
    });

    if (error) {
      console.error("❌ Failed to send email!");
      console.error("Resend API Error Payload:", error);
    } else {
      console.log("✅ Email sent successfully!");
      console.log("Response Data:", data);
    }
  } catch (err) {
    console.error("❌ Uncaught exception during sending:", err);
  }
}

runTest();
