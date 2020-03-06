var express = require('express');
var loginDAO = require('../DAO/login');
var autenticacion = require('../DAO/autenticacion');
var router = express.Router();

router.post('/iniciarS', async function(req, res, next) {
    var login = req.body;
    if (!login){
        return  res.status(200).send({estado: 'Fallo', mensaje:'Datos incorrectos'});
    }
    var uexiste = await loginDAO.iniciarSesion(login);
    if(uexiste === " " || uexiste === null){
        return res.status(200).send({estado: 'Fallo', mensaje:'Usuario no existe o contrasenia incorrecta'});
    }
    //console.log(pexiste);
    var token = await autenticacion.crearToken();

    return res.status(200).send({estado: 'Exito', token: token, id: uexiste.id, mensaje:'Se inicio sesion'});
    // res.status(200).send('Se agrego correctamente');

});

router.post('/cerrarS', async function(req, res, next) {
    var usuario = req.body;

    if (!usuario){
        return  res.status(200).send({estado: 'Fallo', mensaje:'Datos incorrectos'});
    }
    const token = req.headers['access-token'];
    // console.log(token);
    if(token !== undefined && token !== ""){
        var verificacion = await autenticacion.verificarToken(token);

        if(verificacion.mensaje === 'correcto' && verificacion !== {}){
            var estado = await loginDAO.cerrarSesion(usuario);
            if(estado === " " || estado === null){
                return res.status(200).send({estado: 'Fallo', mensaje:'No se cerro sesion'});
            }

            return res.status(200).send({estado: 'Exito', mensaje:'Se cerro sesion'});
        }else {
            return res.status(200).send({estado: 'Fallo', mensaje:'Token incorrecto'});
        }

    }else{
        return res.status(200).send({estado: 'Fallo', mensaje:'No se recibio el token'});
    }


});

module.exports = router;
