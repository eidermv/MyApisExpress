jwt = require('jsonwebtoken');

async function crearToken() {
    const payload = {
        check:  true
    };
    const token = jwt.sign(payload, process.env.CLAVE, {
        expiresIn: process.env.TIEMPO,
        algorithm: process.env.ALGORITMO
    });
    return token;
}

async function verificarToken(token) {
    if (token) {
        var respuesta = {};
        jwt.verify(token, process.env.CLAVE, (err, decoded) => {
            if (err) {
                respuesta = { mensaje: 'invalido' };
                return respuesta;
            } else {
                console.log('decode ' +decoded.check);
                if(decoded.check === true){
                    respuesta = { mensaje: 'correcto' };
                    return respuesta;
                }
            }
        });
        return respuesta;
    } else {
        return { mensaje: 'no token' };
    }
}

module.exports = {crearToken, verificarToken};
