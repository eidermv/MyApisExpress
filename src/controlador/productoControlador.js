var express = require('express');
var productoDAO = require('../DAO/producto');
var autenticacion = require('../DAO/autenticacion');
var router = express.Router();

router.post('/productos', async function(req, res, next) {

    const token = req.headers['access-token'];
    // console.log(token);
    if(token !== undefined && token !== ""){
        var verificacion = await autenticacion.verificarToken(token);

        if(verificacion.mensaje === 'correcto' && verificacion !== {}){


            var pexiste = await productoDAO.getProductos();
            if(pexiste === " " || pexiste === null){
                return res.status(200).send({estado: 'Fallo', mensaje:'Productos incorrecto'});
            }
            //console.log(pexiste);

            return res.status(200).send({estado: 'Exito', datos: pexiste, mensaje:'Productos obtenidos'});
            // res.status(200).send('Se agrego correctamente');

        }else {
            return res.status(200).send({estado: 'Fallo', mensaje:'Token incorrecto'});
        }

    }else{
        return res.status(200).send({estado: 'Fallo', mensaje:'No se recibio el token'});
    }

});


router.post('/porId', async function(req, res, next) {
    var producto = req.body;
    if (!producto){
        return  res.status(200).send({estado: 'Fallo', mensaje:'Datos incorrectos'});
    }
    const token = req.headers['access-token'];
    // console.log(token);
    if(token !== undefined && token !== ""){
        var verificacion = await autenticacion.verificarToken(token);

        if(verificacion.mensaje === 'correcto' && verificacion !== {}){


            var pexiste = await productoDAO.getProductoPorID(producto.id);
            if(pexiste === " " || pexiste === null){
                return res.status(200).send({estado: 'Fallo', mensaje:'Producto incorrecto'});
            }
            //console.log(pexiste);

            return res.status(200).send({estado: 'Exito', datos: pexiste, mensaje:'Producto obtenido'});
            // res.status(200).send('Se agrego correctamente');

        }else {
            return res.status(200).send({estado: 'Fallo', mensaje:'Token incorrecto'});
        }

    }else{
        return res.status(200).send({estado: 'Fallo', mensaje:'No se recibio el token'});
    }

});

router.post('/agregar', async function(req, res, next) {
    var producto = req.body;
    if (!producto){
        return  res.status(200).send({estado: 'Fallo', mensaje:'Datos incorrectos'});
    }
    const token = req.headers['access-token'];
    // console.log(token);
    if(token !== undefined && token !== ""){
        var verificacion = await autenticacion.verificarToken(token);

        if(verificacion.mensaje === 'correcto' && verificacion !== {}){


            var pexiste = await productoDAO.agregarProducto(producto);
            if(pexiste === " " || pexiste === null){
                return res.status(200).send({estado: 'Fallo', mensaje:'Producto incorrecto'});
            }
            //console.log(pexiste);
            if (pexiste.estado === 'correcto')
                return res.status(200).send({estado: 'Exito', mensaje:'Producto agregado'});
            else
                return res.status(200).send({estado: 'Fallo', mensaje:'No se agrego producto'});
            // res.status(200).send('Se agrego correctamente');

        }else {
            return res.status(200).send({estado: 'Fallo', mensaje:'Token incorrecto'});
        }

    }else{
        return res.status(200).send({estado: 'Fallo', mensaje:'No se recibio el token'});
    }

});

router.post('/actualizar', async function(req, res, next) {
    var producto = req.body;
    if (!producto){
        return  res.status(200).send({estado: 'Fallo', mensaje:'Datos incorrectos'});
    }
    const token = req.headers['access-token'];
    // console.log(token);
    if(token !== undefined && token !== ""){
        var verificacion = await autenticacion.verificarToken(token);

        if(verificacion.mensaje === 'correcto' && verificacion !== {}){


            var pexiste = await productoDAO.actualizarProducto(producto);
            if(pexiste === " " || pexiste === null){
                return res.status(200).send({estado: 'Fallo', mensaje:'Producto incorrecto'});
            }
            //console.log(pexiste);
            if (pexiste.estado === 'correcto')
                return res.status(200).send({estado: 'Exito', mensaje:'Producto actualizado'});
            else
                return res.status(200).send({estado: 'Fallo', mensaje:'No se acualizo producto'});
            // res.status(200).send('Se agrego correctamente');

        }else {
            return res.status(200).send({estado: 'Fallo', mensaje:'Token incorrecto'});
        }

    }else{
        return res.status(200).send({estado: 'Fallo', mensaje:'No se recibio el token'});
    }

});

router.post('/eliminar', async function(req, res, next) {
    var producto = req.body;
    if (!producto){
        return  res.status(200).send({estado: 'Fallo', mensaje:'Datos incorrectos'});
    }
    const token = req.headers['access-token'];
    // console.log(token);
    if(token !== undefined && token !== ""){
        var verificacion = await autenticacion.verificarToken(token);

        if(verificacion.mensaje === 'correcto' && verificacion !== {}){


            var pexiste = await productoDAO.eliminarProducto(producto.id);
            if(pexiste === " " || pexiste === null){
                return res.status(200).send({estado: 'Fallo', mensaje:'Producto incorrecto'});
            }
            //console.log(pexiste);
            if (pexiste.estado === 'correcto')
                return res.status(200).send({estado: 'Exito', mensaje:'Producto eliminado'});
            else
                return res.status(200).send({estado: 'Fallo', mensaje:'No se elimino producto'});
            // res.status(200).send('Se agrego correctamente');

        }else {
            return res.status(200).send({estado: 'Fallo', mensaje:'Token incorrecto'});
        }

    }else{
        return res.status(200).send({estado: 'Fallo', mensaje:'No se recibio el token'});
    }

});

module.exports = router;
