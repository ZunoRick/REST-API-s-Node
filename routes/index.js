const express = require('express');
const router = express.Router();

const clienteController = require('../controllers/clienteController');

module.exports = function(){
    //Agrega nuevos clientes via POST
    router.post('/clientes', clienteController.nuevoCliente);
    
    //Obtener todos los clientes
    router.get('/clientes', clienteController.obtenerClientes);

    //Muestra un cliente en específico (ID)
    router.get('/clientes/:idCliente', clienteController.obtenerCliente);

    //Actualizar Cliente
    router.put('/clientes/:idCliente', clienteController.actualizarCliente);

    //Eliminar Cliente
    router.delete('/clientes/:idCliente', clienteController.eliminarCliente);

    return router;
}