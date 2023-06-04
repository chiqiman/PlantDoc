const mysql = require('mysql');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    database: 'plandoc',
    password: ''
});

connection.connect((err) => {
    if (err) {
        console.log(err);
        throw err;
    }
    console.log("Database Connnected");
});

module.exports = connection;