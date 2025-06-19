const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const { emailHtml } = require('./exportHtml');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/send', async (req, res) => {
  const { email, subject, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: subject,
    //   text: `From: ${email}\n\n${message}`,
         html: emailHtml({ email, subject, message }),

    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to send email' });
  }
});

app.listen(5000, () => {
  console.log('✅ Server running on http://localhost:5000');
});
