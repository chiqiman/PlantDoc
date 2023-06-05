const accounts = require('./accounts');

const Register = (req, res) => {
  const { username, password, email } = req.body;

  if (!username) {
    res.status(400).json({
      status: 'fail',
      message: 'Gagal menambahkan username. Mohon isi username !!',
    });
    return;
  }

  if (!password) {
    res.status(400).json({
      status: 'fail',
      message: 'password salah',
    });
    return;
  }

  if (!email) {
    res.status(400).json({
      status: 'fail',
      message: 'password salah',
    });
    return;
  }

  const id_account = nanoid(16);
  const newAccount = { id_account, username, password, email };
  accounts.push(newAccount);

  const isSuccess = accounts.filter((account) => account.id_account === id_account).length > 0;
  if (isSuccess) {
    res.status(201).json({
      status: 'success',
      message: 'Anda berhasil registrasi akun',
      data: {
        accountId: id_account
      }
    });
  } else {
    res.status(500).json({
      status: 'fail',
      message: 'Gagal registrasi',
    });
  }
};

const Login = (req, res) => {
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

  const id_account = nanoid(16);
  const newLogin = { username, password };
  accounts.push(newLogin);

  const isSuccess = accounts.filter((account) => account.id_account === id_account).length > 0;
  if (isSuccess) {
    res.status(201).json({
      status: 'success',
      message: 'Anda berhasil Login',
      data: {
        accountId: id_account
      }
    });
  } else {
    res.status(500).json({
      status: 'fail',
      message: 'Gagal Login',
    });
  }
};

const Logout = (req, res) => {
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
  Register,
  Login,
  Logout,
};
