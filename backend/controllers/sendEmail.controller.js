import nodemailer from "nodemailer";
import process from "process";
import { ApiResponse } from "../utils/ApiResponce.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const sendEmail = asyncHandler(async (req, res) => {
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
    from: email,
    to: process.env.EMAIL_USER,
    subject: "Contact from form NJOYEDU",
    html: `
          <p>Name: ${name}</p>
          <p>Email: ${email}</p>
          <p>Highest Education: ${education}</p>
          <p>Interest Field: ${interest}</p>
          <p>Gender: ${gender}</p>
        `,
  };

  // Send the email
  const success = await transporter.sendMail(mailOptions);
  res.status(200).json(new ApiResponse(200));

  if (!success) throw new ApiError(500, "internal server error");
});

export default sendEmail;
