const { response } = require('express');


const usuariosGet = (req, res = response) =>{

    const {q, nombre = 'no hay', apyKey, page = 1, limit} = req.query;
    res.json({
        msg: 'get API - controlador',
        q,
        nombre,
        apyKey,
        page,
        limit
    });
}

const usuariosPost = (req, res = response) =>{

    const body = req.body;
    res.json({
        msg: 'Post API - controlador',
        body
    });
}
const usuariosPut = (req, res = response) =>{

    const id = req.params.id;
    res.json({
        msg: 'Put API - controlador',
        id
    });
}
const usuariosPatch = (req, res = response) =>{
    res.json({
        msg: 'Patch API - controlador'
    });
}
const usuariosDelete = (req, res = response) =>{
    res.json({
        msg: 'Delete API - controlador'
    });
}



module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}
