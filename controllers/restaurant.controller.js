
const restaurantModel = require('../models/restaurantModel')


const getAllRestaurant =  (req, res, next) =>{
    try{
        const ettermek = restaurantModel.find()
        res.status(200).json(ettermek)
    } catch (error) {
        res.status(500)
    }
}

const createRestaurant = async (req, res) =>{
    const newRestaurant = await restaurantModel.create(req.body)
    res.status(201).json(createModel)
}

module.exports = {
    getAllRestaurant, createRestaurant
}
