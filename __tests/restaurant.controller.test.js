const httpMocks = require('node-mocks-http');
const restaurantController = require('../controllers/restaurant.controller');
const restaurantModel = require('../models/restaurantModel');
const restaurantList = require('./mock-data/allRestaurants.json');
const newRestaurant = require('./mock-data/newRestaurant.json');

restaurantModel.findById = jest.fn();
restaurantModel.find = jest.fn();
restaurantModel.create = jest.fn();

let req, res, next;

const restaurantById = {"address": {"building": "8825", "coord": [-73.8803827, 40.7643124], "street": "Astoria Boulevard", "zipcode": "11369"}, "borough": "Queens", "cuisine": "American ", "grades": [{"date": {"$date": 1416009600000}, "grade": "Z", "score": 38}, {"date": {"$date": 1398988800000}, "grade": "A", "score": 10}, {"date": {"$date": 1362182400000}, "grade": "A", "score": 7}, {"date": {"$date": 1328832000000}, "grade": "A", "score": 13}], "name": "Brunos On The Boulevard", "restaurant_id": "40356151"}


beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = null;
});

describe('A getAll végponthoz tartozó metódus tesztelése', () => {
    it('A getAllRestaurants függvénynek léteznie kell', () => {
        expect(typeof restaurantController.getAllRestaurant).toBe('function');
    });

    it('A getAllRestaurant függvényben meg kellene hívni a model find() függvényét', () => {
        restaurantController.getAllRestaurant(req, res, next);
        expect(restaurantModel.find).toHaveBeenCalled();
    });

    it('A getAllRestaurant függvénynek vissza kellene adjon egy json listát az összes étteremmel és egy 200-as státuszkódot', async () => {
        restaurantModel.find.mockReturnValue(restaurantList);
        await restaurantController.getAllRestaurant(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(restaurantList);
    });
});

describe('A create végponthoz tartozó metódus tesztelése', () => {
    beforeEach(() => {
        req.body = newRestaurant;
    });

    it('A createRestaurant függvénynek léteznie kell', () => {
        expect(typeof restaurantController.createRestaurant).toBe('function');
    });

    it('A createRestaurant függvénynek meg kellene hívnia a model create() függvényét a request body-val', async () => {
        await restaurantController.createRestaurant(req, res, next);
        expect(restaurantModel.create).toHaveBeenCalledWith(newRestaurant);
    });
    it('A createRestaurant függvénynek vissza kellene adnia egy json választ az újonnan létrehozott étteremmel és egy 201-es státuszkódot', async () => {
        restaurantModel.create.mockReturnValue(newRestaurant);
        await restaurantController.createRestaurant(req, res, next);
        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(newRestaurant);
    });
});

describe('A getRestaurantById végponthoz tartozó metódus tesztelése', () => {
    beforeEach(() => {
        req.params = { id: '1' };
    });

    it('A getRestaurantById függvénynek léteznie kell', () => {
        expect(typeof restaurantController.getRestaurantById).toBe('function');
    });

    it('A getRestaurantById függvénynek meg kellene hívnia a model findById() függvényét a megfelelő id-val', async () => {
        await restaurantController.getRestaurantById(req, res, next);
        expect(restaurantModel.findById).toHaveBeenCalledWith('1');
    });

    it('A getRestaurantById függvénynek vissza kellene adnia egy json választ az adott étteremmel és egy 200-as státuszkódot', async () => {
        restaurantModel.findById.mockResolvedValue(restaurantById);
        await restaurantController.getRestaurantById(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(restaurantById);
    });

    it('A getRestaurantById függvénynek 404-es státuszkódot kellene visszaadnia, ha az étterem nem található', async () => {
        restaurantModel.findById.mockReturnValue(null);
        await restaurantController.getRestaurantById(req, res, next);
        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getData()).toBe('Nincs ilyen étterem');
    });
});

