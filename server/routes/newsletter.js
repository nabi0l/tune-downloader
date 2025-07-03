const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// In-memory storage for demo purposes
// In a real app, you would use a database
const subscribers = new Set();

// POST /api/newsletter/subscribe
router.post(
  '/subscribe',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email address')
      .normalizeEmail(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;

    // Check if email is already subscribed
    if (subscribers.has(email)) {
      return res.status(400).json({
        errors: [{ msg: 'This email is already subscribed' }],
      });
    }

    // Add to subscribers (in a real app, save to database)
    subscribers.add(email);
    console.log('New subscriber:', email);
    console.log('Total subscribers:', subscribers.size);

    res.status(200).json({
      success: true,
      message: 'Thank you for subscribing to our newsletter!',
    });
  }
);

module.exports = router;
