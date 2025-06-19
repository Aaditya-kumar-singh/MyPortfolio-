const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/contact', sendEmail);

export default router;
