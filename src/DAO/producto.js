var mariaDb = require('../db/db');

//SELECT id_producto, nombre, porcentaje_ganancia, precio, cantidad, id_categoria
// FROM producto;
async function getProductos() {
    try {
        let conn = await mariaDb.getConn();
        const resp = await conn.query("select id_producto, nombre, porcentaje_ganancia, precio, cantidad, id_categoria from producto;");
        conn.release();

        var productosJSON = [];
        resp.forEach(function (prod, index, arr) {
            productosJSON.push(
                {
                    Id: prod.id_producto,
                    Nombre: prod.nombre,
                    Porcentaje: prod.porcentaje_ganancia,
                    Precio: prod.precio,
                    Cantidad: prod.cantidad,
                    Categoria: prod.id_categoria
                }
            );

        });
        return productosJSON;

    }
    catch (err) {
        console.log(err);
        return null;
    }

}

async function getProductoPorID(Id) {
    try {
        let conn = await mariaDb.getConn();
        const resp = await conn.query("select id_producto, nombre, porcentaje_ganancia, precio, cantidad, id_categoria from producto where id = ?;", [Id]);
        conn.release();
        // console.log(resp.length);
        if(resp.length === 0){
            return " ";
        }else{
            var productosJSON = {};
            resp.forEach(function (prod, index, arr) {
                productosJSON=
                    {
                        Id: prod.id_producto,
                        Nombre: prod.nombre,
                        Porcentaje: prod.porcentaje_ganancia,
                        Precio: prod.precio,
                        Cantidad: prod.cantidad,
                        Categoria: prod.id_categoria
                    };

            });
            return productosJSON;
        }

    } catch (err) {
        console.log(err);
        return null;
    }
}

//INSERT INTO producto
// (nombre, porcentaje_ganancia, precio, cantidad, id_categoria)
// VALUES('', 0, 0, 0, 0);

async function agregarProducto(producto) {
    try {
        let conn = await mariaDb.getConn();
        const resp = await conn.query("insert into producto (nombre, porcentaje_ganancia, precio, cantidad, id_categoria) values ( ?, ?, ?, ?, ?);", [producto.nombre, Number(producto.porcentaje),  Number(producto.precio), Number(producto.cantidad), Number(producto.categoria)]);
        conn.release();

        if (resp.affectedRows > 0){
            return {estado:'correcto', mensaje: 'Se agrego correctamente'};
        }else {
            return {estado:'Fallo', mensaje: 'No se agrego'};
        }

    } catch (err) {
        console.log(err);
        return null;
    }
}
//UUPDATE producto
// SET nombre='', porcentaje_ganancia=0, precio=0, cantidad=0, id_categoria=0
// WHERE id_producto=0;

async function actualizarProducto(producto) {
    try {
        let conn = await mariaDb.getConn();
        const resp = await conn.query("update producto set nombre= ?, porcentaje_ganancia= ?, precio= ?, cantidad= ?, id_categoria= ? where id_producto = ?;", [producto.nombre, Number(producto.porcentaje),  Number(producto.precio), Number(producto.cantidad), Number(producto.categoria),  Number(producto.id)]);
        conn.release();

        // if (resp === null){
        //     return "No se actualizo";
        // }else if(resp.warningStatus > 0){
        //     return "Error actualizando";
        // }else
        if (resp.affectedRows > 0){
            return {estado:'correcto', mensaje: 'Se actualizo correctamente'};
        }else {
            return {estado:'Fallo', mensaje: 'No se actualizo'};
        }
    } catch (err) {
        console.log(err);
        return null;
    }
}

//DELETE FROM producto
// WHERE id_producto=0;
async function eliminarProducto(Id) {
    try {
        let conn = await mariaDb.getConn();
        const resp = await conn.query("delete from producto where id_producto = ?;", [Number(Id)]);
        conn.release();

        // if (resp === null){
        //     return "No se actualizo";
        // }else if(resp.warningStatus > 0){
        //     return "Error actualizando";
        // }else
        if (resp.affectedRows > 0){
            return {estado:'correcto', mensaje: 'Se elimino correctamente'};
        }else {
            return {estado:'Fallo', mensaje: 'No se elimino'};
        }
    } catch (err) {
        console.log(err);
        return null;
    }
}

module.exports = {getProductos, getProductoPorID, agregarProducto, actualizarProducto, eliminarProducto};
