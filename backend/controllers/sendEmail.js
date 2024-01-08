import nodemailer from "nodemailer";
import process from "process";

const sendEmail = async(req,res) => {
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
        await transporter.sendMail(mailOptions);
    
        res.status(200).send("Email sent successfully");
      } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
      }
}

export default sendEmail
