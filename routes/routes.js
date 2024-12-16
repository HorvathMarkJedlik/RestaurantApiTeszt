const express = require('express');
const restaurantController = require('../controllers/restaurant.controller'); // A vezérlő importálása

const router = express.Router();

// GET kérés az összes étterem lekérdezésére
router.get('/', restaurantController.getAllRestaurant);

// POST kérés új étterem létrehozására
router.post('/', restaurantController.createRestaurant);

// GET kérés egy adott étterem lekérdezésére ID alapján
router.get('/:id', restaurantController.getRestaurantById);

// PUT kérés egy adott étterem frissítésére ID alapján
router.put('/:id', restaurantController.updateRestaurant);

// DELETE kérés egy adott étterem törlésére ID alapján
router.delete('/:id', restaurantController.deleteRestaurant);

module.exports = router;
