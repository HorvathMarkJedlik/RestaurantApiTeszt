const httpMocks = require('node-mocks-http')
const restaurantController = require('../controllers/restaurant.controller')
const restaurantModel = require('../models/restaurantModel')
const restaurantList = require('./mock-data/allRestaurants.json')
const newRestaurant = require('./mock-data/newRestaurant.json')

restaurantModel.find = jest.fn()
restaurantModel.create = jest.fn()
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
        expect(res._isEndCalled()).toBeTruthy()
        expect(res._getJSONData()).toStrictEqual(restaurantList)
    })
})

describe('A create végponthoz tartozó metódus tesztelése', () => {
    beforeEach(()=>{
        req.body = newRestaurant
    })
    it('A createRestaurant-nak függvénynek kéne lennie', () =>{
        expect(typeof restaurantController.createRestaurant).toBe('function')
    })
    // it('A createRestaurant függvényben meg kellene hívni a model find() függvényét', () =>{
    //     restaurantController.createRestaurant(req, res)
    //     expect(restaurantModel.create).toHaveBeenCalledWith(newRestaurant)
    // })
})