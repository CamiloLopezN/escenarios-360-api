require('dotenv').config();
const mongoose = require('mongoose');
const {MONGO_USER, MONGO_PASS, MONGO_DB, MONGO_URL} = process.env;

/*
* Opciones de la base de datos
* */

const mongoOptions = {
    user: MONGO_USER,
    password: MONGO_PASS,
    databaseName: MONGO_DB,
    writeConcern: 'majority',
    retryWrites: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}

/*
* CONEXION A LA BASE DE DATOS
* */
mongoose
  .connect(MONGO_URL, mongoOptions)
  .then(() => console.log('Connected to Database!'))
  .catch((err) => console.log(err));
module.exports = mongoose;
