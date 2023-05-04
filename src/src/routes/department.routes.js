// Controllers
const { departmentController } = require('../controllers/index.controllers')

// Checks - middleware
const { departmentMiddleware, sharedMiddleware } = require('../middleware/index.checks.middleware');

// Libraries
const { Router } = require("express");

const router = Router();

router.post('/', [
    departmentMiddleware.checkCreateDepartment(),
], departmentController.createDepartment);

router.get('/',[
],departmentController.getAllDepartment);

router.put('/:id', [
    departmentMiddleware.checkUpdateDepartment(),
    sharedMiddleware.checkId(),
], departmentController.updateDepartment);

router.delete('/:id', [
    sharedMiddleware.checkId(),
], departmentController.deleteDepartment);

module.exports = router;