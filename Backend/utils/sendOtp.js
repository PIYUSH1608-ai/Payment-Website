import crypto from "crypto";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import db from "../db.js"
dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.EMAIL_PASS,
    },
});

export function generateOtp() {
    return crypto.randomInt(100000, 1000000).toString();
}

export async function sendOtpEmail(toEmail) {
    const otp=generateOtp();
    const [result] = await db.execute(`INSERT INTO Otp_store (registered_email, original_otp) VALUES (?, ?) ON DUPLICATE KEY UPDATE original_otp = VALUES(original_otp)`,[toEmail, otp]
    );
    const mailOptions = {
    from: `"Payment Website" <${process.env.EMAIL_ID}>`,
    to: toEmail,
    subject: "Your Verification OTP Code",
    html: `
        <div style="font-family: Arial, sans-serif; padding: 16px;">
        <h2>Email Verification</h2>
        <p>Use the following OTP to verify your email address. It is valid for <strong>5 minutes</strong>:</p>
        <h1 style="letter-spacing: 4px; color: #2b6cb0;">${otp}</h1>
        <p>If you did not request this code, please ignore this email.</p>
        </div>
    `,
    };

    await transporter.sendMail(mailOptions);
}
