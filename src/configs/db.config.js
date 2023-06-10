const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  database: 'plantdoc',
  password: 'qwerty12345',
});

connection.connect((err) => {
  if (err) {
    console.log(err);
    throw err;
  }
  console.log('===Database Connnected===');
});

module.exports = connection;
