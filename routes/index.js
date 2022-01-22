const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();

const clienteController = require('../controllers/clienteController');
const productosController = require('../controllers/productosController');
const pedidosController = require('../controllers/pedidosController');

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

    /* Productos */
    //Nuevos Productos
    router.post('/productos', 
        productosController.subirArchivo,
        productosController.nuevoProducto
    );

    //Muestra todos los productos
    router.get('/productos', productosController.obtenerProductos);

    //Muestra un producto en específico por su ID
    router.get('/productos/:idProducto', productosController.obtenerProducto);

    //Actualizar producto
    router.put('/productos/:idProducto',
        productosController.subirArchivo,
        productosController.actualizarProducto
    );

    //Eliminar producto
    router.delete('/productos/:idProducto', productosController.eliminarProducto);

    /* PEDIDOS */
    //Agrega nuevos pedidos
    router.post('/pedidos', pedidosController.nuevoPedido);

    //mostrar todos los pedidos
    router.get('/pedidos', pedidosController.mostrarPedidos);

    //Mostrat un pedido en específico
    router.get('/pedidos/:idPedido', pedidosController.mostrarPedido);

    //Actualizar pedidos
    router.put('/pedidos/:idPedido', pedidosController.actualizarPedido);

    //Eliminar pedidos
    router.delete('/pedidos/:idPedido', pedidosController.eliminarPedido);

    return router;
}