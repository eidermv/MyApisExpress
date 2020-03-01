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
        jwt.verify(token, process.env.CLAVE, (err, decoded) => {
            if (err) {
                return { mensaje: 'invalido' };
            } else {
                return { mensaje: 'correcto'};
            }
        });
    } else {
        return { mensaje: 'no token' };
    }
}

module.exports = {crearToken, verificarToken};
