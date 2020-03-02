var express = require('express');
var categoriaDAO = require('../DAO/categoria');
var autenticacion = require('../DAO/autenticacion');
var router = express.Router();


router.post('/categorias', async function(req, res, next) {

    const token = req.headers['access-token'];
    // console.log(token);
    if(token !== undefined && token !== ""){
        var verificacion = await autenticacion.verificarToken(token);

        if(verificacion.mensaje === 'correcto' && verificacion !== {}){


            var cexiste = await categoriaDAO.getCategorias();
            if(cexiste === " " || cexiste === null){
                return res.status(500).send({estado: 'Fallo', mensaje:'Categorias incorrecto'});
            }
            //console.log(pexiste);

            return res.status(200).send({estado: 'Exito', cexiste, mensaje:'Categorias obtenidas'});
            // res.status(200).send('Se agrego correctamente');

        }else {
            return res.status(500).send({estado: 'Fallo', mensaje:'Token incorrecto'});
        }

    }else{
        return res.status(500).send({estado: 'Fallo', mensaje:'No se recibio el token'});
    }

});


router.post('/porUs', async function(req, res, next) {
    var usuario = req.body;
    if (!usuario){
        return  res.status(500).send({estado: 'Fallo', mensaje:'Datos incorrectos'});
    }
    const token = req.headers['access-token'];
    // console.log(token);
    if(token !== undefined && token !== ""){
        var verificacion = await autenticacion.verificarToken(token);

        if(verificacion.mensaje === 'correcto' && verificacion !== {}){


            var cexiste = await categoriaDAO.getCategoriaPorUsuario(usuario.id);
            if(cexiste === " " || cexiste === null){
                return res.status(500).send({estado: 'Fallo', mensaje:'Usuario incorrecto'});
            }
            //console.log(pexiste);

            return res.status(200).send({estado: 'Exito', cexiste, mensaje:'Categoria obtenido'});
            // res.status(200).send('Se agrego correctamente');

        }else {
            return res.status(500).send({estado: 'Fallo', mensaje:'Token incorrecto'});
        }

    }else{
        return res.status(500).send({estado: 'Fallo', mensaje:'No se recibio el token'});
    }

});

module.exports = router;
