
const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos } = require('../middlewares');
const { crearProducto, obtenerProducto, actualizarProducto, obtenerProductos, borrarProducto } = require('../controllers/productos.js');
const { existeProducto } = require('../helpers/db-validators');

const router = Router();

router.put('/:id', [
    check('id').custom(existeProducto),
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
],actualizarProducto);

router.get('/', obtenerProductos);

router.get('/:id', [
    check('id').custom(existeProducto),
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
],obtenerProducto);

router.post('/', [
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('precio','El precio es obligatorio').not().isEmpty(),
    check('descripcion','El descripcion es obligatorio').not().isEmpty(),
    check('categoria','El categoria es obligatorio').isMongoId(),
    validarCampos
], crearProducto);

router.delete('/:id',[
    check('id').custom(existeProducto),
    validarCampos
],borrarProducto)
module.exports = router;
























