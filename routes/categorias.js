
const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos } = require('../middlewares');
const { crearCategoria, obtenerCategoria, actualizarCategoria, obtenerCategorias, borrarCategoria } = require('../controllers/categorias');
const { existeCategoria } = require('../helpers/db-validators');

const router = Router();

router.put('/:id', [
    check('id').custom(existeCategoria),
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
],actualizarCategoria);

router.get('/', obtenerCategorias);

router.get('/:id', [
    check('id').custom(existeCategoria),
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
],obtenerCategoria);

router.post('/', [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarJWT,
    validarCampos
], crearCategoria);

router.delete('/:id',[
    check('id').custom(existeCategoria),
    validarCampos
],borrarCategoria)
module.exports = router;
























