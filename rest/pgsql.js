const { Pool } = require('pgsql');

const pool = new Pool();


/*({
    user : process.env.PGSQL_USER,
    password : process.env.PGSQL_PASSWORD,
    database : process.env.PGSQL_DATABASE,
    host : process.env.PGSQL_HOST,
    port : process.env.PGSQL_PORT
});*/

exports.pool = pool;