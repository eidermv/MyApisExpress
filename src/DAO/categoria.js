var mariaDb = require('../db/db');

async function getCategorias() {
    try {
        let conn = await mariaDb.getConn();
        const resp = await conn.query("select id_categoria, nombre from categoria;");
        conn.release();
        // console.log(resp.length);
        if(resp.length === 0){
            return " ";
        }else{
            var categoriaJSON = [];
            resp.forEach(function (cat, index, arr) {
                usuarioJSON.push(
                    {
                        Id: cat.id_categoria,
                        Nombre: cat.nombre
                    }
            );

            });
            return categoriaJSON;
        }

    } catch (err) {
        console.log(err);
        return null;
    }
}

async function getCategoriaPorUsuario(Id) {
    try {
        let conn = await mariaDb.getConn();
        const resp = await conn.query("select id_categoria, nombre from categoria where id_usuario = ?;", [Id]);
        conn.release();
        // console.log(resp.length);
        if(resp.length === 0){
            return " ";
        }else{
            var categoriaJSON = [];
            resp.forEach(function (cat, index, arr) {
                usuarioJSON.push(
                    {
                        Id: cat.id_categoria,
                        Nombre: cat.nombre
                    }
                );

            });
            return categoriaJSON;
        }

    } catch (err) {
        console.log(err);
        return null;
    }
}

module.exports = {getCategorias, getCategoriaPorUsuario};
