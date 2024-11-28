
const restaurantModel = require('../models/restaurantModel')


const getAllRestaurant =  (req, res, next) =>{
    const ettermek = restaurantModel.find()
    res.status(200).json(ettermek)
}

module.exports = {
    getAllRestaurant
}
