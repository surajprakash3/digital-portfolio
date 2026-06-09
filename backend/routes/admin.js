const express = require('express');
const router = express.Router();
const { ContactMessage } = require('../models');

// @route   GET api/admin/messages
// @desc    Get all contact messages
router.get('/messages', async (req, res) => {
    try {
        const messages = await ContactMessage.find().sort({ date: -1 });
        res.json({ success: true, messages });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;
