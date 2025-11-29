import express from 'express';
import QuoteRequest from '../models/QuoteRequest.js';
import { protect, adminOnly } from '../middleware/auth.js';
import { validateQuoteRequest } from '../middleware/validation.js';
import nodemailer from 'nodemailer';

const router = express.Router();

// Email transporter configuration
const createTransporter = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    return null;
  }
  
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// @route   GET /api/quotes
// @desc    Get all quote requests
// @access  Private/Admin
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const quotes = await QuoteRequest.find()
      .populate('productId', 'name SKU')
      .sort({ createdAt: -1 });
    res.json(quotes);
  } catch (error) {
    console.error('Get quotes error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/quotes
// @desc    Create a quote request
// @access  Public
router.post('/', validateQuoteRequest, async (req, res) => {
  try {
    const quote = await QuoteRequest.create(req.body);
    const populatedQuote = await QuoteRequest.findById(quote._id).populate('productId', 'name SKU');

    // Send email notification if configured
    const transporter = createTransporter();
    if (transporter) {
      try {
        await transporter.sendMail({
          from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
          to: process.env.EMAIL_FROM || 'oceanrenterprises@gmail.com',
          subject: 'New Quote Request - OceanR Enterprises',
          html: `
            <h2>New Quote Request</h2>
            <p><strong>Name:</strong> ${quote.name}</p>
            <p><strong>Company:</strong> ${quote.company || 'N/A'}</p>
            <p><strong>Email:</strong> ${quote.email}</p>
            <p><strong>Phone:</strong> ${quote.phone}</p>
            <p><strong>Message:</strong></p>
            <p>${quote.message}</p>
            ${quote.productId ? `<p><strong>Product:</strong> ${populatedQuote.productId?.name || 'N/A'}</p>` : ''}
          `,
        });
      } catch (emailError) {
        console.error('Email send error:', emailError);
      }
    }

    res.status(201).json(populatedQuote);
  } catch (error) {
    console.error('Create quote error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/quotes/:id
// @desc    Update quote status
// @access  Private/Admin
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const quote = await QuoteRequest.findById(req.params.id);

    if (!quote) {
      return res.status(404).json({ message: 'Quote request not found' });
    }

    if (req.body.status) {
      quote.status = req.body.status;
      await quote.save();
    }

    const updatedQuote = await QuoteRequest.findById(quote._id).populate('productId', 'name SKU');
    res.json(updatedQuote);
  } catch (error) {
    console.error('Update quote error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/quotes/:id
// @desc    Delete a quote request
// @access  Private/Admin
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const quote = await QuoteRequest.findById(req.params.id);

    if (!quote) {
      return res.status(404).json({ message: 'Quote request not found' });
    }

    await quote.deleteOne();
    res.json({ message: 'Quote request removed' });
  } catch (error) {
    console.error('Delete quote error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
