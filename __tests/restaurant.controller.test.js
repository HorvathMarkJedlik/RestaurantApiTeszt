const { type } = require('express/lib/response')
const getAllRestaurants = require('../controllers/restaurant.controller')

describe('A getAll végponthoz tartozó metódus tesztelése', () => {
    it('A getAllRestaurants függvénynek léteznie kell', () =>{
        expect(typeof getAllRestaurants).toBe('function')
    })
})