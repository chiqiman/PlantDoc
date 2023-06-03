const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'instance',
    user: 'root',
    database: 'database',
    password: 'password'
});

connection.connect((err) => {
    if (err) throw err;
    console.log("connnected");
});

module.exports = connection;