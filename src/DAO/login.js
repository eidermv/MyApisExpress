var mariaDb = require('../db/db');

async function iniciarSesion(usuario) {
    try {
        let conn = await mariaDb.getConn();
        const resp = await conn.query("select id_usuario from login where usuario = ?, contrasenia = ?;", [usuario.usuario, usuario.contrasenia]);
        conn.release();
        // console.log(resp.length);
        if(resp.length === 0){
            return " ";
        }else{
            if(resp.length > 1){
                return { error: 'usuarios' }
            }
            var usuarioJSON = {};
            resp.forEach(function (us, index, arr) {
                usuarioJSON =
                    {
                        id: us.id_usuario,
                        estado: 'si'
                    };

            });
            actualizarEstado(usuarioJSON);
            return usuarioJSON;
        }

    } catch (err) {
        console.log(err);
        return null;
    }
}

async function cerrarSesion(usuario) {
    try {
        let conn = await mariaDb.getConn();
        const resp = await conn.query("select id_usuario from login where id_usuario = ?;", [usuario.id]);
        conn.release();
        // console.log(resp.length);
        if(resp.length === 0){
            return " ";
        }else{
            var usuarioJSON = {};
            resp.forEach(function (us, index, arr) {
                usuarioJSON=
                    {
                        id: us.id_usuario,
                        estado: 'no'
                    };

            });
            actualizarEstado(usuarioJSON);
            return usuarioJSON;
        }

    } catch (err) {
        console.log(err);
        return null;
    }
}

async function actualizarEstado(usuario) {
    try {
        let conn = await mariaDb.getConn();
        const resp = await conn.query("update usuario set es_activo = ? where id = ?;", [usuario.estado, Number(usuario.id)]);
        conn.release();

        // if (resp === null){
        //     return "No se actualizo";
        // }else if(resp.warningStatus > 0){
        //     return "Error actualizando";
        // }else
        if (resp.affectedRows > 0){
            return "Se actualizo correctamente";
        }else {
            return "No se actualizo";
        }
    } catch (err) {
        console.log(err);
        return null;
    }
}

module.exports = {iniciarSesion, cerrarSesion};
