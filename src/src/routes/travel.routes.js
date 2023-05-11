// Controllers
const { travelController } = require('../controllers/index.controllers');

// Checks - middleware
const { travelMiddleware } = require('../middleware/index.checks.middleware');
const sharedCheckMiddleware = require('../middleware/checks/shared.check.middleware');

// Libraries
const { Router } = require("express");

const router = Router();

router.get('/vehiclesAvailableToTravel',[
    //TODO: implementation of role permission validation
    travelMiddleware.checkVehiclesAvailableToTravel()
], travelController.getVehiclesAvailableToTravel);

router.post('/', [
    //TODO: implementation of role permission validation
    travelMiddleware.checkCreateTravel()
], travelController.createTravel);

router.get('/', [
    //TODO: implementation of role permission validation
], travelController.getAllTravels);

router.get('/getDriverVehicleTravel', [
    travelMiddleware.checkGetDriverVehicleTravel()
], travelController.getDriverVehicleTravel);

router.get('/:id', [
    //TODO: implementation of role permission validation
    sharedCheckMiddleware.checkId(),
    travelMiddleware.checkTravelExist()
], travelController.getTravel);

router.put('/:id', [
    //TODO: implementation of role permission validation
    sharedCheckMiddleware.checkId(),
    travelMiddleware.checkUpdateTravel()
], travelController.updateTravel);

router.delete('/:id', [
    //TODO: implementation of role permission validation
    sharedCheckMiddleware.checkId()
], travelController.deleteTravel);

module.exports = router;