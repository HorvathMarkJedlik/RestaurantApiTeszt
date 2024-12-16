const httpMocks = require('node-mocks-http');
const restaurantController = require('../controllers/restaurant.controller');
const restaurantModel = require('../models/restaurantModel');
const restaurantList = require('./mock-data/allRestaurants.json');
const newRestaurant = require('./mock-data/newRestaurant.json');

// Mockok beállítása
restaurantModel.find = jest.fn();
restaurantModel.create = jest.fn();
restaurantModel.findById = jest.fn();
restaurantModel.findByIdAndUpdate = jest.fn();
restaurantModel.findByIdAndDelete = jest.fn();

let req, res, next;
const restaurantId = "30075445";

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn(); 
});

describe('A getAll végponthoz tartozó metódus tesztelése', () => {
    it('A getAllRestaurants függvénynek léteznie kell', () => {
        expect(typeof restaurantController.getAllRestaurant).toBe('function');
    });

    it('A getAllRestaurant függvényben meg kellene hívni a model find() függvényét', async () => {
        await restaurantController.getAllRestaurant(req, res, next);
        expect(restaurantModel.find).toHaveBeenCalled();
    });

    it('A getAllRestaurant függvénynek vissza kellene adnia egy json listát az összes étteremmel', async () => {
        restaurantModel.find.mockResolvedValue(restaurantList);
        await restaurantController.getAllRestaurant(req, res, next);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(restaurantList);
    });

    it('A getAllRestaurant függvény 200-as státuszkóddal kéne, hogy visszatérjen', async () => {
        restaurantModel.find.mockResolvedValue(restaurantList);
        await restaurantController.getAllRestaurant(req, res, next);
        expect(res.statusCode).toBe(200);
    });

    it('Hiba esetén a next függvényt kellene hívnia', async () => {
        const errorMessage = "Szerver hiba";
        restaurantModel.find.mockRejectedValue(new Error(errorMessage));
        await restaurantController.getAllRestaurant(req, res, next);
        expect(next).toHaveBeenCalledWith(expect.any(Error));
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
        restaurantModel.create.mockResolvedValue(newRestaurant);
        await restaurantController.createRestaurant(req, res, next);
        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(newRestaurant);
    });

    it('Hiba esetén a next függvényt kellene hívnia', async () => {
        const errorMessage = "Hiba történt";
        restaurantModel.create.mockRejectedValue(new Error(errorMessage));
        await restaurantController.createRestaurant(req, res, next);
        expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
});

describe('getRestaurantById tesztek', () => {
    it('A getRestaurantById függvénynek léteznie kell', () => {
        expect(typeof restaurantController.getRestaurantById).toBe('function');
    });

    it('A getRestaurantById függvénynek meg kellene hívnia a findById-t', async () => {
        req.params.restaurantId = restaurantId;
        await restaurantController.getRestaurantById(req, res, next);
        expect(restaurantModel.findById).toHaveBeenCalledWith(restaurantId);
    });

    it('Ha az étterem nem létezik, 404-es hibát kellene kapni', async () => {
        restaurantModel.findById.mockResolvedValue(null);
        await restaurantController.getRestaurantById(req, res, next);
        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled()).toBeTruthy();
    });

    it('Ha az étterem létezik, 200-as státuszkóddal kellene visszatérni', async () => {
        restaurantModel.findById.mockResolvedValue(newRestaurant);
        req.params.restaurantId = restaurantId;
        await restaurantController.getRestaurantById(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toStrictEqual(newRestaurant);
    });

    it('Hiba esetén a next függvényt kellene hívnia', async () => {
        restaurantModel.findById.mockRejectedValue(new Error("Hiba"));
        await restaurantController.getRestaurantById(req, res, next);
        expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
});

describe('updateRestaurant tesztek', () => {
    it('Az updateRestaurant függvénynek léteznie kell', () => {
        expect(typeof restaurantController.updateRestaurant).toBe('function');
    });

    it('A updateRestaurantnak meg kellene hívnia a findByIdAndUpdate-t', async () => {
        req.params.restaurantId = restaurantId;
        req.body = newRestaurant;
        await restaurantController.updateRestaurant(req, res, next);
        expect(restaurantModel.findByIdAndUpdate).toHaveBeenCalledWith(restaurantId, newRestaurant, {
            new: true,
            useFindAndModify: false,
        });
    });

    it('Ha az étterem nem létezik, 404-es hibát kellene kapni', async () => {
        restaurantModel.findByIdAndUpdate.mockResolvedValue(null);
        await restaurantController.updateRestaurant(req, res, next);
        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled()).toBeTruthy();
    });

    it('Ha az étterem sikeresen frissül, 200-as státuszkóddal és json adattal kellene visszatérnie', async () => {
        restaurantModel.findByIdAndUpdate.mockResolvedValue(newRestaurant);
        req.params.restaurantId = restaurantId;
        req.body = newRestaurant;
        await restaurantController.updateRestaurant(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toStrictEqual(newRestaurant);
    });

    it('Hiba esetén a next függvényt kellene hívnia', async () => {
        const errorMessage = "Hiba";
        restaurantModel.findByIdAndUpdate.mockRejectedValue(new Error(errorMessage));
        await restaurantController.updateRestaurant(req, res, next);
        expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
});

describe('deleteRestaurant tesztek', () => {
    it('A deleteRestaurant függvénynek léteznie kell', () => {
        expect(typeof restaurantController.deleteRestaurant).toBe('function');
    });

    it('A deleteRestaurantnak meg kellene hívnia a findByIdAndDelete-t', async () => {
        req.params.restaurantId = restaurantId;
        await restaurantController.deleteRestaurant(req, res, next);
        expect(restaurantModel.findByIdAndDelete).toHaveBeenCalledWith(restaurantId);
    });

    it('Ha az étterem nem létezik, 404-es hibát kellene kapni', async () => {
        restaurantModel.findByIdAndDelete.mockResolvedValue(null);
        await restaurantController.deleteRestaurant(req, res, next);
        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled()).toBeTruthy();
    });

    it('Ha az étterem sikeresen törlődik, 200-as státuszkóddal és json adattal kellene visszatérnie', async () => {
        restaurantModel.findByIdAndDelete.mockResolvedValue(newRestaurant);
        req.params.restaurantId = restaurantId;
        await restaurantController.deleteRestaurant(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toStrictEqual(newRestaurant);
    });

    it('Hiba esetén a next függvényt kellene hívnia', async () => {
        const errorMessage = "Hiba";
        restaurantModel.findByIdAndDelete.mockRejectedValue(new Error(errorMessage));
        await restaurantController.deleteRestaurant(req, res, next);
        expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
});
