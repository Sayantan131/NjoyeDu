import express from "express";
import nodemailer from "nodemailer";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import process from "process";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

app.post("/send-email", async (req, res) => {
  try {
    const { name, email, education, interest, gender } = req.body;

    // Create a transporter with your SMTP credentials
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Compose the email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "New Contact Form Submission",
      html: `
        <p>Name: ${name}</p>
        <p>Email: ${email}</p>
        <p>Highest Education: ${education}</p>
        <p>Interest Field: ${interest}</p>
        <p>Gender: ${gender}</p>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(200).send("Email sent successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
