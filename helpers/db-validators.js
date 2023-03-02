const Role = require('../models/role');
const Usuario = require('../models/usuario');
const Categoria = require('../models/categoria');
const { Producto } = require('../models');

const esRoleValido = async(rol = '') => {

    const existeRol = await Role.findOne({ rol });
    if ( !existeRol ) {
        throw new Error(`El rol ${ rol } no está registrado en la BD`);
    }
}


const existeProducto = async( id ) => {

    const existeProducto = await Producto.findById( id );
    if ( !existeProducto) {
        throw new Error(`El  producto: ${ id }, no esta registrado`);
    }
}
const existeCategoria = async( id ) => {

    const existeCategoria = await Categoria.findById( id );
    if ( !existeCategoria ) {
        throw new Error(`La categoria: ${ id }, no esta registrada`);
    }
}


const emailExiste = async( correo = '' ) => {

    // Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if ( existeEmail ) {
        throw new Error(`El correo: ${ correo }, ya está registrado`);
    }
}

const existeUsuarioPorId = async( id ) => {

    // Verificar si el correo existe
    const existeUsuario = await Usuario.findById(id);
    if ( !existeUsuario ) {
        throw new Error(`El categoria no existe ${ id }`);
    }
}



module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoria,
    existeProducto
}

