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

module.exports = router;