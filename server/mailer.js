import nodemailer from "nodemailer";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

export async function genMail(email, link, rString) {
  const transporter = nodemailer.createTransport({
    // host: "smtp.ethereal.com",
    // port: 587,
    // secure: false,
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_USER,
    },
  });

  const composeEmail = {
    from: process.env.NODEMAILER_USER,
    to: email,
    subject: "Automatic reply from nodemailer for password reset",
    html: `<h4>Dear user</h3>\n<p>Link for resetting the password - <a href=${link}>Reset Password</a></p>
        \n<p>Verification number is ${rString}</p>
        `,
  };

  transporter.sendMail(composeEmail, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(info);
    }
  });
}
