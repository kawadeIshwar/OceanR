import express from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import AdminUser from '../models/AdminUser.js';
import { validateLogin } from '../middleware/validation.js';
import { sendOTPEmail } from '../config/nodemailer.js';

const router = express.Router();

// @route   POST /api/auth/login
// @desc    Authenticate admin and get token
// @access  Public
router.post('/login', validateLogin, async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await AdminUser.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/auth/forgot-password
// @desc    Send OTP for password reset (admin email only)
// @access  Public
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Check if email is the admin email
    const adminEmail = process.env.ADMIN_EMAIL || 'oceanrenterprises@gmail.com';
    if (email !== adminEmail) {
      // Don't reveal if email is valid or not for security
      return res.json({ 
        message: 'If an account with that email exists, an OTP has been sent to your email.' 
      });
    }

    const user = await AdminUser.findOne({ email });

    if (!user) {
      // Don't reveal if user exists or not for security
      return res.json({ 
        message: 'If an account with that email exists, an OTP has been sent to your email.' 
      });
    }

    // Generate and save OTP
    const otp = user.generateOTP();
    await user.save({ validateBeforeSave: false });

    // Send OTP email
    try {
      await sendOTPEmail(email, otp);
      console.log(`OTP sent to admin email: ${email}`);
    } catch (emailError) {
      console.error('Error sending OTP email:', emailError);
      // Clear OTP if email fails
      user.clearOTP();
      await user.save({ validateBeforeSave: false });
      return res.status(500).json({ 
        message: 'Error sending OTP email. Please try again later.' 
      });
    }

    res.json({ 
      message: 'OTP has been sent to your email address.',
      // Include email in development for testing
      email: process.env.NODE_ENV === 'development' ? email : undefined
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/auth/verify-otp
// @desc    Verify OTP for password reset
// @access  Public
router.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: 'Email and OTP are required' });
    }

    // Check if email is the admin email
    const adminEmail = process.env.ADMIN_EMAIL || 'oceanrenterprises@gmail.com';
    if (email !== adminEmail) {
      return res.status(400).json({ message: 'Invalid email or OTP' });
    }

    const user = await AdminUser.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or OTP' });
    }

    // Verify OTP
    const isValidOTP = user.verifyOTP(otp);

    if (!isValidOTP) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    // Generate a temporary token for password reset
    const resetToken = jwt.sign(
      { id: user._id, type: 'password-reset' },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    res.json({ 
      message: 'OTP verified successfully. You can now reset your password.',
      resetToken 
    });
  } catch (error) {
    console.error('OTP verification error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/auth/reset-password
// @desc    Reset password after OTP verification
// @access  Public
router.put('/reset-password', async (req, res) => {
  try {
    const { password, resetToken } = req.body;

    if (!password || password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    if (!resetToken) {
      return res.status(400).json({ message: 'Reset token is required' });
    }

    // Verify the reset token
    let decoded;
    try {
      decoded = jwt.verify(resetToken, process.env.JWT_SECRET);
    } catch (tokenError) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    // Check if token is for password reset
    if (decoded.type !== 'password-reset') {
      return res.status(400).json({ message: 'Invalid reset token' });
    }

    // Find user by ID
    const user = await AdminUser.findById(decoded.id);

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Set new password
    user.passwordHash = password;
    user.clearOTP(); // Clear OTP fields
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.json({ message: 'Password reset successful. You can now login with your new password.' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
