const httpMocks = require('node-mocks-http')
const restaurantController = require('../controllers/restaurant.controller')
const restaurantModel = require('../models/restaurantModel')

restaurantModel.find = jest.fn()


describe('A getAll végponthoz tartozó metódus tesztelése', () => {
    it('A getAllRestaurants függvénynek léteznie kell', () =>{
        expect(typeof restaurantController.getAllRestaurant).toBe('function')
    })
    it('A getAllRestaurant függvényben meg kellene hívni a model find() függvényét', () =>{
        let req, res, next
        req = httpMocks.createRequest()
        res = httpMocks.createResponse()
        next = null
        restaurantController.getAllRestaurant(req, res, next)
        expect(restaurantModel.find).toHaveBeenCalled()
    })
})