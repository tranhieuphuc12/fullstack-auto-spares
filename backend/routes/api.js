// routes/api.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');


// GET products with pagination
router.get('/products', async (req, res) => {
  const page = parseInt(req.query.page) || 2;
  const limit = parseInt(req.query.limit) || 5; 
  const skip = (page - 1) * limit;
  
  try {
    const products = await Product.find().skip(skip).limit(limit);
    const totalProducts = await Product.countDocuments();
    res.status(200).json({
      products,
      totalPages: Math.ceil(totalProducts / limit),      
      totalItems: totalProducts,

    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  } finally {
    console.log(`GET /products?page=${page}&limit=${limit}`);
  }

});

// GET a single product by ID
router.get('/products/:id', async (req, res) => {
  const productId = req.params.id; 

  if (!productId) {
    return res.status(400).json({ error: 'Product ID is required' });
  }

  
  if (isNaN(productId)) {
    return res.status(400).json({ error: 'Product ID must be a number' });
  }

  try {
    const product = await Product.findOne({ id: productId });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch product' });
  } finally {
    console.log(`productId: ${productId} got request`);
    
  }
});

// POST a new product
router.post('/products', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create product' });
  }
});

// PUT update product by ID
router.put('/products/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    if (!updatedProduct) return res.status(404).json({ error: 'Product not found' });
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update product' });
  }
});

// DELETE product by ID
router.delete('/products/:id', async (req, res) => {
  try {
    const deleted = await Product.findOneAndDelete({ id: req.params.id });
    if (!deleted) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

module.exports = router;
