const express = require('express');
const router = express.Router();
const Brand = require('../models/Brand');
const mongoose = require('mongoose');

//GET brands by type
router.get('/brands/type/:type', async (req, res) => {
  const { type } = req.params;
  try {
    const brands = await Brand.find({ type });
    if (brands.length === 0) {
      return res.status(404).json({ message: 'No brands found for this type' });
    }
    res.status(200).json(brands);
    } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch brands' });
    }
    finally {
    console.log(`GET /brands/${type}`);
    }
});
    

// GET all brands
router.get('/brands', async (req, res) => {
  try {
    const brands = await Brand.find();
    res.status(200).json(brands);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch brands' });
  } finally {
    console.log('GET /brands');
  }
});
// GET a single brand by brand's name
router.get('/brands/name/:name', async (req, res) => {
  const brandName = req.params.name;

  if (!brandName) {
    return res.status(400).json({ error: 'Brand name is required' });
  }

  try {
    const brand = await Brand.findOne({ name: brandName });
    if (!brand) return res.status(404).json({ error: 'Brand not found' });

    res.json({ id: brand._id.toString(), name: brand.name });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch brand' });
  } finally {
    console.log(`GET /brands/${brandName}`);
  }
});

module.exports = router;
