const mongoose = require('mongoose');

const personSchema = mongoose.Schema({
    ci : {
        type: String,
    },
    nombre : {
        type: String,
    },
    apellido: {
        type: String,
    },
    fecha_nacimiento: {
        type: String,
    },
    categoria: {
        type: String,
    },
    correo: {
        type: String,
    },
    celular: {
        type: String,
    }

});

module.exports = mongoose.model('personas', personSchema);