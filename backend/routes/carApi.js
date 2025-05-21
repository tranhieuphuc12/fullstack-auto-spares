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

// POST a new car
router.post('/cars', async (req, res) => {
    const { brand, model, year } = req.body;

    if (!brand || !model || !year) {
        return res.status(400).json({ error: 'Car brand, model, and year are required' });
    }

    try {
        const newCar = new Car({ brand, model, year });
        await newCar.save();
        res.status(201).json(newCar);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create car' });
        console.error(err);
    } finally {
        console.log('POST /cars');
    }
}
);

module.exports = router;