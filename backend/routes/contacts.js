const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all contacts
router.get('/', auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json(user.contacts);
});

// Add a contact
router.post('/', auth, async (req, res) => {
  const { name, phone, email } = req.body;
  const user = await User.findById(req.user);
  user.contacts.push({ name, phone, email });
  await user.save();
  res.status(201).json(user.contacts);
});

// Delete a contact
router.delete('/:id', auth, async (req, res) => {
  const user = await User.findById(req.user);
  user.contacts = user.contacts.filter(
    contact => contact._id.toString() !== req.params.id
  );
  await user.save();
  res.json(user.contacts);
});

module.exports = router; 