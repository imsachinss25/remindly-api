const nodemailer = require("nodemailer");
const axios = require("axios");

// const transporter = nodemailer.createTransport({
//   host: process.env.BREVO_HOST,
//   port: Number(process.env.BREVO_PORT),
//   secure: false,
//   connectionTimeout: 15000,
//   greetingTimeout: 15000,
//   socketTimeout: 15000,
//   auth: {
//     user: process.env.BREVO_LOGIN,
//     pass: process.env.BREVO_SMTP_KEY,
//   },
// });

// Having issues of smtp connection on Render
const sendEmailBySmtp = async (to, subject, text) => {

  const resp = await transporter.sendMail({
    from: process.env.BREVO_FROM,
    to,
    subject,
    text,
  });
  console.log("resp>>>> ", resp)
};

const sendEmailByAxios = async (to, subject, text) => {
  await axios.post(
  "https://api.brevo.com/v3/smtp/email",
  {
    sender: {
      email: process.env.BREVO_FROM,
      name: "Remindly"
    },
    to: [{ email: to }],
    subject,
    textContent: text
  },
  {
    headers: {
      "api-key": process.env.BREVO_API_KEY,
      "Content-Type": "application/json"
    }
  }
);
}

module.exports = sendEmailByAxios;