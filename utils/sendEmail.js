const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.BREVO_HOST,
  port: process.env.BREVO_PORT,
  secure: false,
  connectionTimeout: 15000,
  greetingTimeout: 15000,
  socketTimeout: 15000,
  auth: {
    user: process.env.BREVO_LOGIN,
    pass: process.env.BREVO_SMTP_KEY,
  },
});

const sendEmail = async (to, subject, text) => {
  console.log("mail logs >>>> ", {
     host: process.env.BREVO_HOST,
  port: process.env.BREVO_PORT,
  from: process.env.BREVO_FROM,
  })
  const resp = await transporter.sendMail({
    from: process.env.BREVO_FROM,
    to,
    subject,
    text,
  });
  console.log("resp>>>> ", resp)
};

module.exports = sendEmail;