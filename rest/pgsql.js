const { Pool } = require('pg');

//dados do banco
const signerOptions = {
    hostname: 'localhost',
    port: 5432,
    username: 'admin',
    password : 'admin',
    database : 'postgres'
}


const pool = new Pool({
    user : signerOptions.username,
    password : signerOptions.password,
    database : signerOptions.database,
    host : signerOptions.hostname,
    port : signerOptions.port
});

exports.pool = pool;