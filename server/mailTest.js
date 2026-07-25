import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function test() {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "Learnify Test",
      text: "Email is working!",
    });

    console.log("✅ Email sent successfully!");
  } catch (err) {
    console.log("❌ Error:");
    console.log(err);
  }
}

test();