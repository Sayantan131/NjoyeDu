import nodemailer from "nodemailer";

const sendEmail = async (user, details) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: `${user.name} <${user.email}>`,
    to: process.env.SMTP_EMAIL,
    subject: `Message from ${user.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
        <h2 style="color: #f60; text-align: center;">Message from ${user.name}</h2>
        <p style="background-color: #f9f9f9; padding: 10px; border-radius: 5px;"><strong>Name:</strong> ${details.name}</p>
        <p style="background-color: #f9f9f9; padding: 10px; border-radius: 5px;"><strong>Phone:</strong> ${details.phone}</p>
        <p style="background-color: #f9f9f9; padding: 10px; border-radius: 5px;"><strong>Email:</strong> ${details.email}</p>
        <p style="background-color: #f9f9f9; padding: 10px; border-radius: 5px;"><strong>Message:</strong> ${details.message}</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

export { sendEmail };
