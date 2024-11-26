const express = require('express')
const getAllRestaurant = require("../controllers/restaurant.controller")

const router = express.Router()

router.get('/', getAllRestaurant)

module.exports = router