const express = require('express');
const nodemailer = require('nodemailer');
const twilio = require('twilio');
const User = require('../models/User');
const auth = require('../middleware/auth');
const dotenv = require('dotenv');

dotenv.config();

const router = express.Router();

const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// SOS trigger
router.post('/', auth, async (req, res) => {
  const { latitude, longitude } = req.body;
  const user = await User.findById(req.user);
  if (!user) return res.status(404).json({ message: 'User not found' });

  const locationUrl = `https://maps.google.com/?q=${latitude},${longitude}`;
  const message = `EMERGENCY! ${user.name} needs help. Location: ${locationUrl}`;

  // Send Email to all contacts
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAILJS_USER,
      pass: process.env.EMAILJS_PASS,
    },
  });

  for (const contact of user.contacts) {
    if (contact.email) {
      await transporter.sendMail({
        from: process.env.EMAILJS_USER,
        to: contact.email,
        subject: 'SOS Alert - SheShield',
        text: message,
      });
    }
    // Send SMS
    await twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: contact.phone,
    });
    // Voice Call (TTS)
    await twilioClient.calls.create({
      twiml: `<Response><Say>${message}</Say></Response>`,
      to: contact.phone,
      from: process.env.TWILIO_PHONE_NUMBER,
    });
  }

  res.json({ message: 'SOS alerts sent to all contacts.' });
});

module.exports = router; 