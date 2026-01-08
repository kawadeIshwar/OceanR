import express from 'express';
import multer from 'multer';
import Product from '../models/Product.js';
import { protect, adminOnly } from '../middleware/auth.js';
import { validateProduct } from '../middleware/validation.js';
import cloudinary from '../config/cloudinary.js';

const router = express.Router();

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// @route   GET /api/products
// @desc    Get all products with optional filters
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, search, featured } = req.query;
    let query = {};

    if (category) {
      query.category = category;
    }

    if (featured === 'true') {
      query.featured = true;
    }

    if (search) {
      query.$text = { $search: search };
    }

    const products = await Product.find(query)
      .populate('category', 'name')
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/products/:id
// @desc    Get single product
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category', 'name');

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/products
// @desc    Create a product
// @access  Private/Admin
router.post(
  '/',
  protect,
  adminOnly,
  upload.fields([
    { name: 'images', maxCount: 5 },
  ]),
  validateProduct,
  async (req, res) => {
    try {
      console.log('Received product creation request');
      console.log('Request body data:', req.body.data);
      console.log('Files:', req.files);

      const productData = JSON.parse(req.body.data || '{}');
      console.log('Parsed product data:', productData);
      
      // Upload images to Cloudinary
      const imageUrls = [];
      if (req.files?.images) {
        console.log('Uploading images to Cloudinary...');
        for (const file of req.files.images) {
          try {
            const result = await new Promise((resolve, reject) => {
              const uploadStream = cloudinary.uploader.upload_stream(
                { folder: 'oceanr/products' },
                (error, result) => {
                  if (error) {
                    console.error('Cloudinary upload error:', error);
                    reject(error);
                  } else {
                    resolve(result);
                  }
                }
              );
              uploadStream.end(file.buffer);
            });
            imageUrls.push(result.secure_url);
            console.log('Image uploaded:', result.secure_url);
          } catch (uploadError) {
            console.error('Failed to upload image:', uploadError);
            throw uploadError;
          }
        }
      }

      // Prepare product data for creation
      console.log('Original specs:', productData.specs);
      const finalProductData = {
        name: productData.name,
        description: productData.description,
        category: productData.category,
        featured: productData.featured || false,
        specs: productData.specs || {},
        images: imageUrls,
      };
      console.log('Final product data specs:', finalProductData.specs);

      console.log('Creating product with data:', finalProductData);
      const product = await Product.create(finalProductData);
      console.log('Product created successfully:', product._id);

      const populatedProduct = await Product.findById(product._id).populate('category', 'name');
      res.status(201).json(populatedProduct);
    } catch (error) {
      console.error('Create product error:', error);
      console.error('Error stack:', error.stack);
      
      // Send more detailed error information
      if (error.name === 'ValidationError') {
        return res.status(400).json({ 
          message: 'Validation error', 
          error: error.message,
          details: error.errors 
        });
      }
      
      res.status(500).json({ 
        message: 'Server error', 
        error: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
    }
  }
);

// @route   PUT /api/products/:id
// @desc    Update a product
// @access  Private/Admin
router.put(
  '/:id',
  protect,
  adminOnly,
  upload.fields([
    { name: 'images', maxCount: 5 },
  ]),
  validateProduct,
  async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);

      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      const productData = JSON.parse(req.body.data || '{}');

      // Upload new images if provided
      if (req.files?.images && productData.replaceImages) {
        const imageUrls = [];
        for (const file of req.files.images) {
          const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
              { folder: 'oceanr/products' },
              (error, result) => {
                if (error) reject(error);
                else resolve(result);
              }
            );
            uploadStream.end(file.buffer);
          });
          imageUrls.push(result.secure_url);
        }
        productData.images = imageUrls;
      }

      // Update other fields
      if (productData.name) product.name = productData.name;
      if (productData.description) product.description = productData.description;
      if (productData.category) product.category = productData.category;
      if (productData.featured !== undefined) product.featured = productData.featured;
      if (productData.images) product.images = productData.images;
      if (productData.specs) product.specs = productData.specs;

      await product.save();

      const updatedProduct = await Product.findById(product._id).populate('category', 'name');
      res.json(updatedProduct);
    } catch (error) {
      console.error('Update product error:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
);

// @route   DELETE /api/products/:id
// @desc    Delete a product
// @access  Private/Admin
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.deleteOne();
    res.json({ message: 'Product removed' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
