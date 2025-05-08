const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Car = require('../models/Car');
const mongoose = require('mongoose');

function normalize(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}
// GET products by car's brand with pagination
router.get('/products/brand/:brand', async (req, res) => {
  const brand = req.params.brand;

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const skip = (page - 1) * limit;
  const stock = 5;


  try {
    //Find all carIds with the given brand
    const carIds = await Car.find({ brand }).distinct('_id');

    if (carIds.length === 0) {
      return res.status(404).json({ error: 'No cars found for this brand' });
    }


    // Find all products with the given carIds
    const products = await Product.find({ carId: { $in: carIds.map(id => new mongoose.Types.ObjectId(id)) } })
      .skip(skip)
      .limit(limit);
    const totalProducts = await Product.countDocuments({ carId: { $in: carIds } });
    if (products.length === 0) {
      return res.status(404).json({ error: 'No products found for this brand' });
    }
    res.status(200).json({
      products,
      totalPages: Math.ceil(totalProducts / limit),
      totalItems: totalProducts,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch products' });
  } finally {
    console.log(`GET /products/carBrand/${brand}`);
  }

});

//GET products by category's objectId with pagination
router.get('/products/categoryId/:categoryId', async (req, res) => {
  const categoryId = req.params.categoryId;

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const skip = (page - 1) * limit;
  const stock = 5;

  if (!mongoose.Types.ObjectId.isValid(categoryId)) {
    return res.status(400).json({ error: 'Invalid category ID' });
  }

  try {
    const products = await Product.find({ categoryId }).skip(skip).limit(limit);
    const totalProducts = await Product.countDocuments({ categoryId });

    if (products.length === 0) {
      return res.status(404).json({ error: 'No products found for this category' });
    }

    res.status(200).json({
      products,
      totalPages: Math.ceil(totalProducts / limit),
      totalItems: totalProducts,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  } finally {
    console.log(`GET /products/categoryId/${categoryId}`);
  }
});

// GET products by search term with pagination
router.get('/search', async (req, res) => {
  const searchTerm = req.query.query;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  // Check for invalid characters (e.g., special characters)
  const invalidCharacters = /[!@#$%^&*()?":{}|<>]/g;

  if (invalidCharacters.test(searchTerm)) {
    return res.status(401).json({ error: 'Search term contains invalid characters!' });
  }

  if (!searchTerm) {
    return res.status(400).json({ error: 'Search term is required!' });
  }
  // Normalize the search term
  const normalizedSearchTerm = normalize(searchTerm);

  try {
    const products = await Product.find({
      $or: [
        { name_normalized: { $regex: normalizedSearchTerm, $options: 'i' } },
        { description_normalized: { $regex: normalizedSearchTerm, $options: 'i' } },
        { productId: { $regex: normalizedSearchTerm, $options: 'i' } }
      ]
    }).skip(skip).limit(limit);
    const totalProducts = await Product.countDocuments({
      $or: [
        { name_normalized: { $regex: normalizedSearchTerm, $options: 'i' } },
        { description_normalized: { $regex: normalizedSearchTerm, $options: 'i' } },
        { productId: { $regex: normalizedSearchTerm, $options: 'i' } }
      ]
    });

    if (products.length === 0) {
      return res.status(404).json({ error: 'No products found' });
    }

    res.status(200).json({
      products,
      totalPages: Math.ceil(totalProducts / limit),
      totalItems: totalProducts,

    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  } finally {
    console.log(`GET /products/search?q=${searchTerm}`);
  }
});

// GET products with pagination
router.get('/products', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
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



  try {
    const product = await Product.findOne({ _id: productId });
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
