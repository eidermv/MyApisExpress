var mariaDb = require('../db/db');

async function getUsuario(Id) {
    try {
        let conn = await mariaDb.getConn();
        const resp = await conn.query("select nombre, apellido, id_usuario from usuario where id_usuario = ?;", [Id]);
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
                        Id: us.id_usuario,
                        Nombres: us.nombre,
                        Apellidos: us.apellido
                    };

            });
            return usuarioJSON;
        }

    } catch (err) {
        console.log(err);
        return null;
    }
}

module.exports = {getUsuario};
