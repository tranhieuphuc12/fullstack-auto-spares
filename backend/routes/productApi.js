const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Category = require('../models/Category');
const Car = require('../models/Car');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

function normalize(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}
// GET products by car's brand with pagination
router.get('/products/brand/:brand', async (req, res) => {
  const brand = req.params.brand;

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const skip = (page - 1) * limit;
  


  try {



    // Find all products with the given carIds
    const products = await Product.find({ 'car.brand': brand }).skip(skip).limit(limit);

    const totalProducts = await Product.countDocuments({ 'car.brand': brand });

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


  if (!mongoose.Types.ObjectId.isValid(categoryId)) {
    return res.status(400).json({ error: 'Invalid category ID' });
  }

  try {
    // Find all products with the given categoryId
    const products = await Product.find({ 'category._id': categoryId }).skip(skip).limit(limit);
    const totalProducts = await Product.countDocuments({ 'category._id': categoryId });

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
        { productId: { $regex: normalizedSearchTerm, $options: 'i' } },
        { JSAsakashi: { $regex: normalizedSearchTerm, $options: 'i' } },
      ]
    }).skip(skip).limit(limit);
    const totalProducts = await Product.countDocuments({
      $or: [
        { name_normalized: { $regex: normalizedSearchTerm, $options: 'i' } },
        { description_normalized: { $regex: normalizedSearchTerm, $options: 'i' } },
        { productId: { $regex: normalizedSearchTerm, $options: 'i' } },
        { JSAsakashi: { $regex: normalizedSearchTerm, $options: 'i' } }
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
    const category = await Category.findOne({ _id: product.category._id });

    res.json({
      product,
      category: {
        id: category._id.toString(),
        name: category.name,
      },
    });
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
    newProduct.name_normalized = normalize(newProduct.name);
    newProduct.description_normalized = normalize(newProduct.description);


    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Failed to create product' });
  }
});
// PUT update a product
router.put('/products/:id', async (req, res) => {
  const _id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json({ error: 'Invalid product ID' });
  }
  try {
    //remove deleted images from the request body
    const existingProduct = await Product.findById(_id);
    if (!existingProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    const oldImages = existingProduct.images || [];
    const newImages = req.body.images || [];

    // Determine which images have been removed
    const deletedImages = oldImages.filter((oldImg) => !newImages.includes(oldImg));

    // Remove deleted image files
    deletedImages.forEach((url) => {
      try {
        const filename = url.split("/uploads/")[1];
        if (!filename) return;

        const imagePath = path.join(__dirname, "..", "public", "uploads", filename);
        fs.unlink(imagePath, (err) => {
          if (err && err.code !== "ENOENT") {
            console.error(`❌ Failed to delete ${imagePath}`, err);
          } else {
            console.log(`🗑️ Deleted image file: ${imagePath}`);
          }
        });
      } catch (err) {
        console.error("❌ Failed to process image URL:", url, err);
      }
    });



    const updatedProduct = await Product.findByIdAndUpdate(_id, req.body, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(updatedProduct);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Failed to update product' });
  }

});

// DELETE a product
router.delete('/products/:id', async (req, res) => {
  const _id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json({ error: 'Invalid product ID' });
  }
  try {
    const product = await Product.findById(_id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    // Remove image files from uploads folder
    if (Array.isArray(product.images)) {
      product.images.forEach((url) => {
        try {
          // Extract filename from URL
          const filename = url.split('/uploads/')[1]; // safe even if full URL
          const imagePath = path.join(__dirname, '..', 'public', 'uploads', filename);

          fs.unlink(imagePath, (err) => {
            if (err && err.code !== 'ENOENT') {
              console.error(`❌ Failed to delete ${imagePath}`, err);
            } else {
              console.log(`🗑️ Deleted file: ${imagePath}`);
            }
          });
        } catch (err) {
          console.error('❌ Error processing image URL:', url, err);
        }
      });
    }

    const deletedProduct = await Product.findByIdAndDelete(_id);
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }


    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});


module.exports = router;
