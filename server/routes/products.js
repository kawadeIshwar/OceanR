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
      console.log('=== PRODUCT CREATION START ===');
      console.log('Timestamp:', new Date().toISOString());
      console.log('Environment:', process.env.NODE_ENV);
      console.log('Request headers:', req.headers);
      console.log('Request body data:', req.body.data);
      console.log('Files:', req.files);
      console.log('Content-Type:', req.get('Content-Type'));

      const productData = JSON.parse(req.body.data || '{}');
      console.log('Parsed product data:', productData);
      
      // Validate required fields
      if (!productData.name) {
        return res.status(400).json({ 
          message: 'Product name is required',
          field: 'name'
        });
      }
      
      if (!productData.category) {
        return res.status(400).json({ 
          message: 'Product category is required',
          field: 'category'
        });
      }
      
      // Upload images to Cloudinary
      const imageUrls = [];
      if (req.files?.images && req.files.images.length > 0) {
        console.log('Uploading', req.files.images.length, 'images to Cloudinary...');
        
        for (const file of req.files.images) {
          try {
            console.log('Processing file:', {
              originalname: file.originalname,
              size: file.size,
              mimetype: file.mimetype
            });
            
            const result = await new Promise((resolve, reject) => {
              const uploadStream = cloudinary.uploader.upload_stream(
                { 
                  folder: 'oceanr/products',
                  resource_type: 'auto',
                  quality: 'auto',
                  fetch_format: 'auto'
                },
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
            console.log('Image uploaded successfully:', result.secure_url);
          } catch (uploadError) {
            console.error('Failed to upload image:', uploadError);
            return res.status(500).json({ 
              message: 'Image upload failed', 
              error: uploadError.message,
              details: 'Failed to upload image to Cloudinary'
            });
          }
        }
      } else {
        console.log('No images provided in request');
      }

      // Prepare product data for creation
      const finalProductData = {
        name: productData.name,
        description: productData.description || '',
        category: productData.category,
        featured: productData.featured || false,
        specs: productData.specs || {},
        images: imageUrls,
      };
      
      console.log('Final product data:', JSON.stringify(finalProductData, null, 2));

      // Create product in database
      console.log('Creating product in database...');
      const product = await Product.create(finalProductData);
      console.log('Product created successfully:', product._id);

      // Populate category for response
      const populatedProduct = await Product.findById(product._id).populate('category', 'name');
      
      console.log('=== PRODUCT CREATION SUCCESS ===');
      res.status(201).json({
        message: 'Product created successfully',
        product: populatedProduct
      });
      
    } catch (error) {
      console.error('=== PRODUCT CREATION ERROR ===');
      console.error('Error details:', {
        message: error.message,
        name: error.name,
        stack: error.stack,
        timestamp: new Date().toISOString()
      });
      
      // Send more detailed error information
      if (error.name === 'ValidationError') {
        const validationErrors = Object.values(error.errors).map(err => ({
          field: err.path,
          message: err.message
        }));
        return res.status(400).json({ 
          message: 'Validation error', 
          error: error.message,
          details: validationErrors
        });
      }
      
      if (error.name === 'CastError') {
        return res.status(400).json({ 
          message: 'Invalid data format', 
          error: error.message,
          details: 'Check your data types and formats'
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
