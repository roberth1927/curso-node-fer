
const { response} = require('express');
const { Producto } = require('../models');

const crearProducto = async (req, res = response) => {

    const { estado, usuario, ...body} = req.body;
    const { nombre} = req.body.nombre;
    const ProductoBd = await Producto.findOne({nombre});

    if(ProductoBd){
        return res.status(400).json({
            msg: `la producto ${ProductoBd.nombre}, ya existe`
        });
    }

    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id,
    }

    const producto = new Producto(data);

    await producto.save();

    res.status(201).json(producto);
}

const actualizarProducto = async(req, res = response) => {
    
    const { id } = req.params;
    const {estado, usuario, ...body} = req.body;

    body.nombre = req.body.nombre.toUpperCase();

    const producto = await Producto.findByIdAndUpdate( id, body, {new: true});

    res.json( producto);
}


const obtenerProductos = async (req, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };
    const [ total, productos ] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
            .skip( Number( desde ) )
            .limit(Number( limite ))
            .sort({nombre: 'desc'}),
            
    ]);

    res.json({
        total,
        productos,
    });
}


const obtenerProducto = async (req, res = response) => {

    const { id } = req.params;

    const producto = await Producto.findById( id ).populate('usuario', ['nombre']).populate('categoria','nombre');

    res.json({
        producto
    });
}



const borrarProducto = async (req, res = response)=>{
    const { id } = req.params;
    const productoBorrado = await Producto.findByIdAndUpdate(id, {estado: false}, {new: true});
    
    res.json(productoBorrado);
}

module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto
}
