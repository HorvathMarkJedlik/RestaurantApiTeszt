const restaurantModel = require('../models/restaurantModel');

const getAllRestaurant = async (req, res, next) => {
    try {
        const ettermek = await restaurantModel.find();
        res.status(200).json(ettermek);
    } catch (error) {
        next(error);
    }
};

const createRestaurant = async (req, res, next) => {
    try {
        const newRestaurant = await restaurantModel.create(req.body);
        res.status(201).json(newRestaurant);
    } catch (error) {
        next(error); 
    }
};

const getRestaurantById = async (req, res, next) => {
    try {
        const data = await restaurantModel.findById(req.params.restaurantId);
        if (data) {
            res.status(200).json(data);
        } else {
            res.status(404).send();
        }
    } catch (error) {
        next(error); 
    }
};

const updateRestaurant = async (req, res, next) => {
    try {
        const updatedRestaurant = await restaurantModel.findByIdAndUpdate(
            req.params.restaurantId,
            req.body,
            {
                new: true,
                useFindAndModify: false,
            }
        );
        if (updatedRestaurant) {
            res.status(200).json(updatedRestaurant);
        } else {
            res.status(404).send();
        }
    } catch (error) {
        next(error); 
    }
};

const deleteRestaurant = async (req, res, next) => {
    try {
        const deleteRestaurant = await restaurantModel.findByIdAndDelete(req.params.restaurantId);
        if (deleteRestaurant) {
            res.status(200).json(deleteRestaurant);
        } else {
            res.status(404).send();
        }
    } catch (error) {
        next(error); 
    }
};

module.exports = {
    getAllRestaurant,
    createRestaurant,
    getRestaurantById,
    updateRestaurant,
    deleteRestaurant
};
