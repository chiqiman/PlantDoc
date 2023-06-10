const connection = require('../configs/db.config');
const bcrypt = require('bcrypt');

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

    const checkQuery = "SELECT * FROM account WHERE LOWER(email) = LOWER(?)";
    const id_account = nanoid(16);

    connection.query(checkQuery, [email], (err, rows) => {
        if (rows.length) {
            return res.status(409).send({message: "Akun ini sudah ada!"});
        } else {
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).send({message: err});
                } else {
                    const createQuery = `INSERT INTO account (id_account, username, password, email) VALUES ('${id_account}', '${username}', '${hash}', '${email}')`;
                    connection.query(createQuery, (err, rows) => {
                        if (err) {
                            return res.status(400).send({message: err});
                        }
                        console.log(rows);
                        res.status(201).send({message: "Register Success"});
                    });
                }
            });
        }
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

    const checkQuery = "SELECT * FROM account WHERE username = ?";
    connection.query(checkQuery, [username], (err, rows) => {
        if (err) {
            return res.status(400).send({message: err});
        }
        bcrypt.compare(password, rows[0].password, (err, result) => {
            if (err) {
                console.log('Username atau Password tidak ditemukan!');
                return res.status(401).send({message: 'Email atau Password salah'});
            }
            if (result) {
                res.send({
                    message: 'Login Success',
                    user: rows[0],
                });
            }
            return res.status(401).send({message: 'Email atau Password salah'});
        });
    });
};

module.exports = { register, login };
