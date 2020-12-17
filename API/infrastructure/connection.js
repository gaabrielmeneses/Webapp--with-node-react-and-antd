const mysql = require('mysql')

const db_connection = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'your_new_password',
    database: 'cadastro-agenda'
})

module.exports = db_connection
