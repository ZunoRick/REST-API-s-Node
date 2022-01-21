const Productos = require('../models/Productos');

const multer = require('multer');
const shortid = require('shortid');
const fs = require('fs');

const configuracionMulter = {
    storage: fileStorage = multer.diskStorage({
        destination:(req, file, next) =>{
            next(null, __dirname+'../../uploads/');
        },
        filename: (req, file, next) =>{ 
            const extension = file.mimetype.split('/')[1];
            next(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req, file, next){
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
            //el callback se ejecuta como true o false: true cuando la imagen se acepta
            next(null, true);
        }else{
            next(new Error('Formato No Válido'), false);
        }
    }
}

const upload = multer(configuracionMulter).single('imagen');

//Sube un archivo
exports.subirArchivo = async (req, res, next) =>{
    upload(req, res, function(error){
        if (error) {
            res.json({mensaje: error});
        }
        return next();
    });
}

//Agrega nuevos productos
exports.nuevoProducto = async (req, res, next) =>{
    const producto = new Productos(req.body);

    try {
        if (req.file.filename) {
            producto.imagen = req.file.filename;
        }

        await producto.save();
        res.json({ mensaje: 'Se agregó un nuevo producto'});
    } catch (error) {
        console.log(error);
        next();
    }
}

//Muestra todos los productos
exports.obtenerProductos = async (req, res, next) =>{
    try {
        //obtner todos los productos
        const productos = await Productos.find({});
        res.json(productos);
    } catch (error) {
        console.log(error);
        next();
    }
}

//Muestra un producto en específico por su ID
exports.obtenerProducto = async (req, res, next) =>{
    const producto = await Productos.findById(req.params.idProducto);

    if (!producto) {
        res.json({mensaje: 'Ese producto no existe'});
        return next();
    }

    //Mostrar producto
    res.json(producto);
}

exports.actualizarProducto = async (req, res, next) =>{
    try {
        //construir nuevo producto
        let nuevoProducto = req.body;

        //verificar si hay imagen nueva
        if (req.file) {
            nuevoProducto.imagen = req.file.filename;
        }else{
            let productoAnterior = await Productos.findById(req.params.idProducto);
            nuevoProducto.imagen = productoAnterior.imagen;
        }

        let producto = await Productos.findOneAndUpdate({
            _id: req.params.idProducto
        },
        nuevoProducto,{
            new: true
        });
        res.json(producto);
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.eliminarProducto = async (req, res, next) =>{
    try {
        let producto = await Productos.findById(req.params.idProducto);
        if (producto.imagen) {
            const imagenProduto = __dirname+`../../uploads/${producto.imagen}`;
            fs.unlink(imagenProduto, (error) =>{
                if (error) {
                    console.log(error);
                }
                return;
            });
        }
        
        await Productos.findOneAndDelete({ _id: req.params.idProducto });
        res.json({ mensaje: 'El producto se ha eliminado' });
    } catch (error) {
        console.log(error);
        next();
    }
}