// File to be able to talk with MySQL database

// File also enable running queries on the database

const mysql = require('mysql2/promise');
const config = require('../config');
// El ejemplo seria este
// ah pues deberia funcionar como lo que tienes marcado

async function query(sql, params) {
    const connection = await mysql.createConnection(config.db);
    const [results, ] = await connection.execute(sql, params);

    return results;
}

module.exports = {
    query
}