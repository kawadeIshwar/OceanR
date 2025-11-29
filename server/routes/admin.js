import express from 'express';
import Product from '../models/Product.js';
import Category from '../models/Category.js';
import QuoteRequest from '../models/QuoteRequest.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/admin/stats
// @desc    Get dashboard statistics
// @access  Private/Admin
router.get('/stats', protect, adminOnly, async (req, res) => {
  try {
    const [productCount, categoryCount, quoteCount, pendingQuotes] = await Promise.all([
      Product.countDocuments(),
      Category.countDocuments(),
      QuoteRequest.countDocuments(),
      QuoteRequest.countDocuments({ status: 'pending' }),
    ]);

    res.json({
      products: productCount,
      categories: categoryCount,
      quotes: quoteCount,
      pendingQuotes,
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
