// Controllers
const { seatController } = require('../controllers/index.controllers')

// Checks - middleware
const { seatMiddleware } = require('../middleware/index.checks.middleware');

// Libraries
const { Router } = require("express");

const router = Router();

router.get('/', [
    seatMiddleware.checkGetAllSeat(),
], seatController.getAllSeatTravel);

router.post('/changeStateToStandBy', [
    seatMiddleware.checkChangeStateToStandBy()
], seatController.changeStateToStandBy)

module.exports = router;