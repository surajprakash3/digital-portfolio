const express = require('express');
const router = express.Router();
const { ContactMessage } = require('../models');

// @route   POST api/contact
// @desc    Submit a contact message
router.post('/', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const newMessage = new ContactMessage({ name, email, message });
        await newMessage.save();
        res.status(201).json({ success: true, message: 'Transmission Received' });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;
