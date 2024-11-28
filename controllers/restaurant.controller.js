
const restaurantModel = require('../models/restaurantModel')


const getAllRestaurant =  (req, res, next) =>{
    const ettermek = restaurantModel.find()
}

module.exports = {
    getAllRestaurant
}
