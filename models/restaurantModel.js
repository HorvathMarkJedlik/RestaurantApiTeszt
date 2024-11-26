const mongoose = require('mongoose')
const restaurantController = require('../controllers/restaurant.controller')

const restaurantSchema = mongoose.Schema(
    {
        "address": {
          "building": {
            "type": "String"
          },
          "coord": {
            "type": [
              "Number"
            ]
          },
          "street": {
            "type": "String"
          },
          "zipcode": {
            "type": "String"
          }
        },
        "borough": {
          "type": "String"
        },
        "cuisine": {
          "type": "String"
        },
        "grades": {
          "type": [
            "Mixed"
          ]
        },
        "name": {
          "type": "String"
        },
        "restaurant_id": {
          "type": "String"
        }
      }
)

const restaurantModel = mongoose.model('Restaurant', restaurantSchema)

module.exports = restaurantModel