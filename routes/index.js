const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();

const clienteController = require('../controllers/clienteController');
const productosController = require('../controllers/productosController');
const pedidosController = require('../controllers/pedidosController');
const usuariosController = require('../controllers/usuariosController');

//middleware para proteger las rutas
const auth = require('../middleware/auth');

module.exports = function(){
    //Agrega nuevos clientes via POST
    router.post('/clientes', 
        auth,
        clienteController.nuevoCliente
    );
    
    //Obtener todos los clientes
    router.get('/clientes', 
        auth,
        clienteController.obtenerClientes
    );

    //Muestra un cliente en específico (ID)
    router.get('/clientes/:idCliente', 
        auth,
        clienteController.obtenerCliente
    );

    //Actualizar Cliente
    router.put('/clientes/:idCliente',
        auth,
        clienteController.actualizarCliente
    );

    //Eliminar Cliente
    router.delete('/clientes/:idCliente', 
        auth,
        clienteController.eliminarCliente
    );

    /* Productos */
    //Nuevos Productos
    router.post('/productos',
        auth, 
        productosController.subirArchivo,
        productosController.nuevoProducto
    );

    //Muestra todos los productos
    router.get('/productos', 
        auth,
        productosController.obtenerProductos
    );

    //Muestra un producto en específico por su ID
    router.get('/productos/:idProducto', 
        auth,
        productosController.obtenerProducto
    );

    //Actualizar producto
    router.put('/productos/:idProducto',
        auth,
        productosController.subirArchivo,
        productosController.actualizarProducto
    );

    //Eliminar producto
    router.delete('/productos/:idProducto', 
        auth,
        productosController.eliminarProducto
    );

    //Busqueda de Productos
    router.post('/productos/busqueda/:query', 
        auth,
        productosController.buscarProducto
    );

    /* PEDIDOS */
    //Agrega nuevos pedidos
    router.post('/pedidos/nuevo/:idUsuario', 
        auth,
        pedidosController.nuevoPedido
    );

    //mostrar todos los pedidos
    router.get('/pedidos', 
        auth,
        pedidosController.mostrarPedidos
    );

    //Mostrat un pedido en específico
    router.get('/pedidos/:idPedido', 
        auth,
        pedidosController.mostrarPedido
    );

    //Actualizar pedidos
    router.put('/pedidos/:idPedido', 
        auth,
        pedidosController.actualizarPedido
    );

    //Eliminar pedidos
    router.delete('/pedidos/:idPedido', 
        auth,
        pedidosController.eliminarPedido
    );

    //Usuarios
    router.post('/crear-cuenta',
        auth,
        usuariosController.registrarUsuario
    );

    router.post('/iniciar-sesion', 
        usuariosController.autenticarUsuario
    );

    return router;
}