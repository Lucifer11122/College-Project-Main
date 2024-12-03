import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// First-time login and password setup
router.post('/setup-password', async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('Setting up password for:', username); // Debug log

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update user with new password
    user.password = hashedPassword;
    user.profileSetup = true;
    await user.save();

    // Generate token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      role: user.role,
      message: 'Password setup successful'
    });

  } catch (error) {
    console.error('Password setup error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('Login attempt for:', username); // Debug log

    const user = await User.findOne({ username });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if user is new (no password set)
    if (!user.password) {
      return res.status(200).json({ 
        isNewUser: true,
        message: 'First time login detected'
      });
    }

    // Verify password for existing users
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Return user data and token
    res.json({
      token,
      isNewUser: false,
      role: user.role,
      user: {
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add this new route to check if user is new
router.post('/check-user', async (req, res) => {
  try {
    const { username } = req.body;
    console.log('Checking user:', username); // Debug log

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if user is new (no password or empty password)
    const isNewUser = !user.profileSetup;
    console.log('User check result:', { username, isNewUser }); // Debug log

    res.json({ 
      isNewUser,
      username: user.username,
      role: user.role 
    });
  } catch (error) {
    console.error('Check user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;