const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');


//crear el servidor
const app = express();

//Rutas de la app
app.use('/', routes());

//puerto
app.listen(5000);