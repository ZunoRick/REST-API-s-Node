const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');

/*Cors permite que un cliente se conecte a otro 
servidor para el intercambio de recursos*/
const cors = require('cors');

//Conectar mongo
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/restapis', {
    useNewUrlParser: true
});

//crear el servidor
const app = express();

// habilitar el bodyparser
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Habilitar cors
app.use(cors());

//Rutas de la app
app.use('/', routes());

//puerto
app.listen(5000);