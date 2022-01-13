const { Router } = require('express')
const { check } = require('express-validator')

const {
    validarCampos,
    validarJWT,
    isAdminRole,
    isRole
} =  require('../middlewares')

const { isRoleValid, emailExisting, userExisting } = require('../helpers/db-validators')

const { usuariosGet, usuariosPost, usuariosPut, usuariosPatch, usuariosDelete } = require('../controllers/usuarios')

const router = Router()

router.get('/', usuariosGet )
router.post('/',[
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y mayor a 6 digitos').isLength({min:6}),
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom(emailExisting),
    check('rol').custom(isRoleValid),
    validarCampos
], usuariosPost)
router.put('/:id',[
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(userExisting),
    check('rol').custom(isRoleValid),
    validarCampos
], usuariosPut)
router.patch('/', usuariosPatch)
router.delete('/:id',[
    validarJWT,
    //isAdminRole,
    isRole('ADMIN_ROLE','VENTAS_ROLE'),
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(userExisting),
    validarCampos
], usuariosDelete)

module.exports =router