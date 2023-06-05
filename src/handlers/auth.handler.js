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

    // const id_account = nanoid(16);
    // const newLogin = { username, password };
    // accounts.push(newLogin);

    // const isSuccess = accounts.filter((account) => account.id_account === id_account).length > 0;
    // if (isSuccess) {
    //     res.status(201).json({
    //     status: 'success',
    //     message: 'Anda berhasil Login',
    //     data: {
    //         accountId: id_account
    //     }
    //     });
    // } else {
    //     res.status(500).json({
    //     status: 'fail',
    //     message: 'Gagal Login',
    //     });
    // }
};

const logout = (req, res) => {
    // Destroy the user's session
    req.session.destroy((err) => {
      // If an error occurs, log it and return a 500 error
      if (err) {
        console.error('Error during session destruction:', err);
        res.status(500).send('Internal Server Error');
      } else {
        // If logout is successful, redirect the user to the home page
        res.redirect('/');
      }
    });
};

module.exports = {
  register,
  login,
  logout,
};
