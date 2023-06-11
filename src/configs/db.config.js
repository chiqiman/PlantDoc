const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: '34.128.118.4',
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
