const { type } = require('express/lib/response')
const getAllRestaurant = require('../controllers/restaurant.controller')

describe('A getAll végponthoz tartozó metódus tesztelése', () => {
    it('A getAllRestaurants függvénynek léteznie kell', () =>{
        expect(typeof getAllRestaurant).toBe('function')
    })
    it('A getAllRestaurant függvényben meg kellene hívni a model find() függvényét', () =>{
        expect()
    })
})