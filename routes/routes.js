const express = require('express')
const getAllRestaurant = require("../controllers/restaurant.controller")

const router = express.Router()

router.post('/', getAllRestaurant)

module.exports = router