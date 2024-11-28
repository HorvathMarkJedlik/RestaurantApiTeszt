const httpMocks = require('node-mocks-http')
const restaurantController = require('../controllers/restaurant.controller')
const restaurantModel = require('../models/restaurantModel')
const restaurantList = require('./mock-data/allRestaurants.json')

restaurantModel.find = jest.fn()
let req, res, next

beforeEach(()=>{
    req = httpMocks.createRequest()
    res = httpMocks.createResponse()
    next = null
})


describe('A getAll végponthoz tartozó metódus tesztelése', () => {
    it('A getAllRestaurants függvénynek léteznie kell', () =>{
        expect(typeof restaurantController.getAllRestaurant).toBe('function')
    })
    it('A getAllRestaurant függvényben meg kellene hívni a model find() függvényét', () =>{
        restaurantController.getAllRestaurant(req, res, next)
        expect(restaurantModel.find).toHaveBeenCalled()
    })
    it('A getAllRestaurant függvénynek vissza kellene adjon egy json listát az összes étteremmel és egy 200-as státuszkódot', async ()=>{
        restaurantModel.find.mockReturnValue(restaurantList)
        await restaurantController.getAllRestaurant(req, res, next)
        expect(res.statusCode).toBe(200)
    })
})