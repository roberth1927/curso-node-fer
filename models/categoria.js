
const { Schema, model } = require('mongoose');

const CategoriaSchema = Schema({
    nombre: {
        type: String,
        unique: true,
        required: [true, 'la categoria es obligatorio']
    },
    estado: {
        type: String,
        default: true,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});


CategoriaSchema.methods.toJSON = function() {
    const { __v,estado, ...data  } = this.toObject();
    return data;
}
module.exports = model( 'Categoria', CategoriaSchema );
