const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.BREVO_HOST,
  port: process.env.BREVO_PORT,
  secure: false,
  auth: {
    user: process.env.BREVO_LOGIN,
    pass: process.env.BREVO_SMTP_KEY,
  },
});

const sendEmail = async (to, subject, text) => {
  const resp = await transporter.sendMail({
    from: `${process.env.BREVO_FROM}`,
    to,
    subject,
    text,
  });
};

module.exports = sendEmail;