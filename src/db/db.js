var express = require('express');

const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASS,
    database: process.env.DBNAME,
    connectionLimit: 50
});

async function getConn() {
    let conn = await pool.getConnection();
    try {
        return conn;
    } catch (err) {
        throw err;
    } finally {
        if (conn) conn.release(); //release to pool
    }
}

module.exports.getConn = getConn;
