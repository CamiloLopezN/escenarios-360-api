require('dotenv').config();
const mongoose = require('mongoose');
const {MONGO_USER, MONGO_PASS, MONGO_DB, MONGO_URL} = process.env;

/*
* Opciones de la base de datos
* */

const mongoOptions = {
    user: MONGO_USER,
    pass: MONGO_PASS,
    dbName: MONGO_DB,
    writeConcern: 'majority',
    retryWrites: true,
    useNewUrlParser: true,
}

/*
* CONEXION A LA BASE DE DATOS
* */
mongoose
    .connect(MONGO_URL, mongoOptions)
    .then(() => console.log('¡Conexión exitosa con ' + MONGO_DB + '!'))
    .catch((err) => console.log(err));
module.exports = mongoose;
