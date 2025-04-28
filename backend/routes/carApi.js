const express = require('express');
const router = express.Router();
const Car = require('../models/Car');

// GET all cars
router.get('/cars', async (req, res) => {
    try {
        const cars = await Car.find();
        res.status(200).json(cars);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch cars' });
    } finally {
        console.log('GET /cars');
    }
}
);

module.exports = router;