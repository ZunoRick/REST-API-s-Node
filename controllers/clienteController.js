const Clientes = require('../models/Clientes');

//Agrega un nuevo cliente
exports.nuevoCliente = async (req, res, next) =>{
    const cliente = new Clientes(req.body);

    try {
        //Almacenar el registro
        await cliente.save();
        res.json({
            mensaje: 'Se agregó un nuevo cliente'
        });
    } catch (error) {
        //Si hay un error
        console.log(error);
        next();
    }
}

//Muestra todos los clientes
exports.obtenerClientes = async (req, res, next) => {
    try {
        const clientes = await Clientes.find({});
        res.json(clientes);
    } catch (error) {
        console.log(error);
        next();
    }
}

//Muestra un cliente por su ID
exports.obtenerCliente = async (req, res, next) => {
    try {
        const cliente = await Clientes.findById(req.params.idCliente);
        //Mostrar cliente
        res.json(cliente);
    } catch (error) {
        res.json({ mensaje: 'Ese cliente no existe'});
        next();
    }
}

//Actualiza un cliente por su ID
exports.actualizarCliente = async (req, res, next) =>{
    try {
        const cliente = await Clientes.findOneAndUpdate({
            _id: req.params.idCliente
        },
        req.body, {
            new: true //New true retorna el nuevo cliente ya actualizado
        });
        res.json(cliente);
    } catch (error) {
        console.log(error);
        next();
    }
}

//Elimina un cliente por su ID
exports.eliminarCliente = async (req, res, next) =>{
    try {
        await Clientes.findOneAndDelete({ _id: req.params.idCliente });
        res.json({ mensaje: 'El cliente se ha eliminado'});
    } catch (error) {
        console.log(error);
        next();
    }
}