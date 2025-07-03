const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { auth, adminAuth } = require('../middleware/auth');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// User registration (alternative to signup, requires authentication)
router.post('/register', auth, async (req, res) => {
  try {
    // The user should already be created in the auth middleware
    // Just return the user data and JWT token
    const user = req.user;
    
    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );
    
    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        displayName: user.displayName,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Error during registration', error: error.message });
  }
});

// Get current user
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-__v');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
});

// Update current user
router.patch('/me', auth, async (req, res) => {
  try {
    const { displayName, email } = req.body;
    const updateData = {};
    
    if (displayName !== undefined) updateData.displayName = displayName;
    if (email !== undefined) updateData.email = email;
    
    const user = await User.findByIdAndUpdate(
      req.user._id,
      updateData,
      { new: true, runValidators: true }
    ).select('-__v');
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
});

// Get user settings
router.get('/settings', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('settings');
    res.json(user.settings || {});
  } catch (error) {
    res.status(500).json({ message: 'Error fetching settings', error: error.message });
  }
});

// Update user settings
router.put('/settings', auth, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { settings: req.body },
      { new: true, runValidators: true }
    ).select('settings');
    
    res.json(user.settings || {});
  } catch (error) {
    res.status(500).json({ message: 'Error updating settings', error: error.message });
  }
});

// Check if current user is admin
router.get('/check-admin', auth, async (req, res) => {
  try {
    // If we've reached here, the auth middleware has already verified the token
    // and attached the user to req.user
    const user = await User.findById(req.user._id).select('role');
    
    if (!user) {
      return res.status(404).json({ isAdmin: false, message: 'User not found' });
    }
    
    // Check if user has admin role
    const isAdmin = user.role === 'admin';
    
    res.json({ isAdmin });
  } catch (error) {
    console.error('Error checking admin status:', error);
    res.status(500).json({ 
      isAdmin: false, 
      message: 'Error checking admin status', 
      error: error.message 
    });
  }
});

// Signup
router.post('/signup', async (req, res) => {
  try {
    console.log('Signup request body:', req.body);
    const { email, password, displayName } = req.body;
    
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email and password are required' 
      });
    }
    
    if (typeof email !== 'string' || typeof password !== 'string') {
      return res.status(400).json({ 
        success: false, 
        message: 'Email and password must be strings' 
      });
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide a valid email address' 
      });
    }
    
    // Password length validation
    if (password.length < 6) {
      return res.status(400).json({ 
        success: false, 
        message: 'Password must be at least 6 characters long' 
      });
    }
    
    console.log('Checking if user exists with email:', email);
    let user = await User.findOne({ email });
    if (user) {
      console.log('User already exists:', user.email);
      return res.status(400).json({ 
        success: false, 
        message: 'An account with this email already exists. Please try logging in instead.' 
      });
    }
    
    console.log('Creating new user with email:', email);
    user = new User({ email, password, displayName });
    await user.save();
    console.log('User created successfully:', user._id);
    res.status(201).json({ 
      success: true, 
      message: 'User registered successfully' 
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error registering user', 
      error: error.message 
    });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    console.log('Login request body:', req.body);
    const { email, password } = req.body;
    
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email and password are required' 
      });
    }
    
    if (typeof email !== 'string' || typeof password !== 'string') {
      return res.status(400).json({ 
        success: false, 
        message: 'Email and password must be strings' 
      });
    }
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }
    
    console.log('User found:', { id: user._id, email: user.email, hasPassword: !!user.password });
    
    // Validate that user has a password
    if (!user.password) {
      console.error('User has no password hash:', user._id);
      return res.status(500).json({ 
        success: false, 
        message: 'Account setup incomplete. Please contact support.' 
      });
    }
    
    try {
      const isMatch = await user.comparePassword(password);
      console.log('Password match result:', isMatch);
      if (!isMatch) {
        return res.status(400).json({ success: false, message: 'Invalid credentials' });
      }
    } catch (compareError) {
      console.error('Password comparison error:', compareError);
      return res.status(500).json({ 
        success: false, 
        message: 'Error comparing passwords', 
        error: compareError.message 
      });
    }
    
    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ 
      success: true, 
      token, 
      user: { 
        id: user._id, 
        email: user.email, 
        displayName: user.displayName, 
        role: user.role 
      } 
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Error logging in', error: error.message });
  }
});

module.exports = router;
