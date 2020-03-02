var express = require('express');
var usuarioDAO = require('../DAO/usuario');
var autenticacion = require('../DAO/autenticacion');
var router = express.Router();

router.post('/usuario', async function(req, res, next) {
    var usuario = req.body;
    if (!usuario){
        return  res.status(500).send({estado: 'Fallo', mensaje:'Datos incorrectos'});
    }
    const token = req.headers['access-token'];
    // console.log(token);
    if(token !== undefined && token !== ""){
        var verificacion = await autenticacion.verificarToken(token);

        if(verificacion.mensaje === 'correcto' && verificacion !== {}){


            var uexiste = await usuarioDAO.getUsuario(usuario.id);
            if(uexiste === " " || uexiste === null){
                return res.status(500).send({estado: 'Fallo', mensaje:'Usuario incorrecto'});
            }
            //console.log(pexiste);

            return res.status(200).send({estado: 'Exito', uexiste, mensaje:'Usuario obtenido'});
            // res.status(200).send('Se agrego correctamente');

        }else {
            return res.status(500).send({estado: 'Fallo', mensaje:'Token incorrecto'});
        }

    }else{
        return res.status(500).send({estado: 'Fallo', mensaje:'No se recibio el token'});
    }

});

module.exports = router;
