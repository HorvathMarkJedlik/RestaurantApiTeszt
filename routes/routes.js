const express = require('express');
const getAllRestaurant = require('../controllers/restaurant.controller'); // A vezérlő importálása

const router = express.Router();

// GET kérés az összes étterem lekérdezésére
router.get('/', getAllRestaurant);
router.post('/', getAllRestaurant.createRestaurant);

module.exports = router;
