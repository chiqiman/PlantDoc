const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connection = require('../configs/db.config');

const register = (req, res) => {
  const { username, password, email } = req.body;
    
  if (!username) {
    res.status(400).json({
      status: 'fail',
      message: 'Gagal menambahkan username. Mohon isi username!',
    });
    return;
  }

  if (!password) {
    res.status(400).json({
      status: 'fail',
      message: 'Gagal menambahkan password. Mohon isi password!',
    });
    return;
  }

  if (!email) {
    res.status(400).json({
      status: 'fail',
      message: 'Gagal menambahkan email. Mohon isi email!',
    });
    return;
  }

  const checkQuery = 'SELECT * FROM account WHERE LOWER(username) = LOWER(?)';

  connection.query(checkQuery, [username], (errCh, rowsCh) => {
    if (rowsCh.length) {
      return res.status(409).send({ message: 'Akun ini sudah ada!' });
    } 
    bcrypt.hash(password, 10, (errB, hash) => {
      if (errB) {
        return res.status(500).send({ message: errB });
      }
      const createQuery = `INSERT INTO account (username, email, password) VALUES ('${username}', '${email}', '${hash}')`;
      connection.query(createQuery, (err, rows) => {
        if (err) {
          return res.status(400).send({ message: err });
        }
        console.log(rows);
        res.status(201).send({ message: 'Register Success' });
      });
    });
  });
};

const login = (req, res) => {
  const { username, password } = req.body;

  if (!username) {
    res.status(400).json({
      status: 'fail',
      message: 'Data yang dimasukkan salah atau tidak lengkap !!',
    });
    return;
  }

  if (!password) {
    res.status(400).json({
      status: 'fail',
      message: 'Data yang dimasukkan salah atau tidak lengkap',
    });
    return;
  }

  const checkQuery = 'SELECT * FROM account WHERE username = ?';
  connection.query(checkQuery, [username], (err, rows) => {
    if (err) {
      return res.status(400).send({ message: err });
    }
    if (!rows.length) {
      return res.status(400).send({ message: 'Username atau Password salah' });
    }
    bcrypt.compare(password, rows[0].password, (errB, result) => {
      if (errB) {
        console.log('Username atau Password tidak ditemukan!');
        return res.status(401).send({ message: 'Username atau Password salah' });
      }
      if (result) {
        const token = jwt.sign({ id: rows[0].id }, 'the-super-strong-secret');

        return res.send({
          message: 'Login Success',
          user: rows[0].username,
          token,
        });
      }
      res.status(401).send({ message: 'Username atau Password salah' });
    });
  });
};

module.exports = { register, login };
