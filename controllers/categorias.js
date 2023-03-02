const { response} = require('express');
const { Categoria } = require('../models');

const crearCategoria = async (req, res = response) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaBd = await Categoria.findOne({nombre});


    if(categoriaBd){
        return res.status(400).json({
            msg: `la categoria ${categoriaBd.nombre}, ya existe`
        });
    }

    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria(data);

    await categoria.save();


    res.status(201).json(categoria);

}

const obtenerCategorias = async (req, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };
    const [ total, categorias, usuario ] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .populate('usuario', 'nombre')
            .skip( Number( desde ) )
            .limit(Number( limite )),
    ]);

    res.json({
        total,
        categorias,
        usuario
    });
}


const obtenerCategoria = async (req, res = response) => {

    const { id } = req.params;

    const categoria = await Categoria.findById( id ).populate('usuario', ['correo','nombre']);

    res.json({
        categoria
    });
}

const actualizarCategoria = async(req, res = response) => {
    
    const { id } = req.params;
    const {estado, usuario, ...data} = req.body;

    data.nombre = req.body.nombre.toUpperCase();
    data.usuario = req._id  

    const categoria = await Categoria.findByIdAndUpdate( id, data, {new: true});

    res.json( categoria);
}


const borrarCategoria = async (req, res = response)=>{
    const { id } = req.params;
    const categoriaBorrada = await Categoria.findByIdAndUpdate(id, {estado: false}, {new: true});
    
    res.json(categoriaBorrada);
}

module.exports = {
    crearCategoria,
    obtenerCategoria,
    actualizarCategoria,
    obtenerCategorias,
    borrarCategoria
}
