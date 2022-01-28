const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env'});

/*Cors permite que un cliente se conecte a otro 
servidor para el intercambio de recursos*/
const cors = require('cors');
const path = require('path');

//Conectar mongo
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true
});

//crear el servidor
const app = express();

//carpeta publica
app.use("/uploads", express.static(path.resolve(__dirname, 'uploads')));

// habilitar el bodyparser
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Definir un dominio o dominios para recibir las peticiones
const whiteList = [process.env.FRONTEND_URL];
const corsOptions = {
    origin: (origin, callback) =>{
        //Revisar si la petición viene de un servidor que está en la whiteList
        const existe = whiteList.some( dominio => dominio === origin);
        if (existe) {
            callback(null, true);
        }else{
            callback(new Error('No permitido por CORS'));
        }
    }
}

//Habilitar cors
app.use(cors(corsOptions));

//Rutas de la app
app.use('/', routes());

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 5000;

//iniciar app
app.listen(port, host, () => {
    console.log('El servidor está corriendo en ', port);
});