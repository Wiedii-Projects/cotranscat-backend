// Controllers
const { departmentController } = require('../controllers/index.controllers')

// Checks - middleware
const { departmentMiddleware, sharedMiddleware } = require('../middleware/index.checks.middleware');

// Libraries
const { Router } = require("express");

// Validators - middleware
const { sharedValidators } = require('../middleware/index.validators.middleware');


const router = Router();

router.post('/', [
    departmentMiddleware.checkCreateDepartment(),
    sharedValidators.validateErrorFields,
], departmentController.createDepartment);

router.get('/',[
    sharedMiddleware.checkJwt(),
    sharedValidators.validateErrorFields
],departmentController.getAllDepartment);

router.put('/:id', [
    departmentMiddleware.checkUpdateDepartment(),
    sharedMiddleware.checkId(),
    sharedValidators.validateErrorFields,
], departmentController.updateDepartment);

router.delete('/:id', [
    sharedMiddleware.checkAdminRole(),
    sharedMiddleware.checkId(),
    sharedValidators.validateErrorFields,
], departmentController.deleteDepartment);

module.exports = router;