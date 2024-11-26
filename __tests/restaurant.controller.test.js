const restaurantController = require('../controllers/restaurant.controller')
const restaurantModel = require('../models/restaurantModel')

restaurantModel.find = jest.fn()


describe('A getAll végponthoz tartozó metódus tesztelése', () => {
    it('A getAllRestaurants függvénynek léteznie kell', () =>{
        expect(typeof restaurantController.getAllRestaurant).toBe('function')
    })
    it('A getAllRestaurant függvényben meg kellene hívni a model find() függvényét', () =>{
        restaurantController.getAllRestaurant()
        expect(restaurantModel.find).toHaveBeenCalled()
    })
})