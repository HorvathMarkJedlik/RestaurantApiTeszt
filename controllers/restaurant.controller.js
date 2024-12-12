const restaurantModel = require('../models/restaurantModel');

const getAllRestaurant = (req, res, next) => {
    try {
        const ettermek = restaurantModel.find();
        res.status(200).json(ettermek);
    } catch (error) {
        res.status(500);
    }
};

const createRestaurant = async (req, res) => {
    const newRestaurant = await restaurantModel.create(req.body);
    res.status(201).json(newRestaurant);
};

const getRestaurantById = async (req, res) => {
    try {
        const { id } = req.params;
        const restaurant = await restaurantModel.findById(id);
        if (!restaurant) {
            return res.status(404).send('Nincs ilyen étterem');
        }
        res.status(200).json(restaurant);
    } catch (error) {
        res.status(500).send('Szerver hiba');
    }
};

module.exports = {
    getAllRestaurant,
    createRestaurant,
    getRestaurantById
};