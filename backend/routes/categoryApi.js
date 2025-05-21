const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

//GET all categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  } finally {
    console.log('GET /categories');
  }
});

//GET a single category by ID
router.get('/categories/:id', async (req, res) => {
  const categoryId = req.params.id;

  if (!categoryId) {
    return res.status(400).json({ error: 'Category ID is required' });
  }

  try {
    const category = await Category.findOne({ _id: categoryId });
    if (!category) return res.status(404).json({ error: 'Category not found' });

    res.json({ id: category._id.toString(), name: category.name });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch category' });
  } finally {
    console.log(`GET /categories/${categoryId}`);
  }
});

//POST a new category
router.post('/categories', async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Category name is required' });
  }

  try {
    const newCategory = new Category({ name });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create category' });
  } finally {
    console.log('POST /categories');
  }
});

module.exports = router;