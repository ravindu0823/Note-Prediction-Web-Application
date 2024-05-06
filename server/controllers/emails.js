import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: process.env.NODEMAILER_SERVICE_PROVIDER,
  host: process.env.NODEMAILER_HOST,
  port: process.env.NODEMAILER_PORT,
  secure: true,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

export const sendEmailUsingNodeMailer = async (req, res) => {
  const { emailHtml, userEmail } = req.body;

  try {
    const options = {
      from: "Musify <musify@gmail.com>",
      to: userEmail,
      subject: "Musify Newsletter",
      html: emailHtml,
    };

    const email = await transporter.sendMail(options);

    if (!email) {
      return res.status(404).json({ error: "Email not sent" });
    }

    return res.status(201).json({ email });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
