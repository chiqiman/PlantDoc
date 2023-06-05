const accounts = require('./accounts');

const Register = (request, h) => {
  const { username, password, email } = request.payload;
    if(!username) {
      const response = h.response({
          status: 'fail',
          message: 'Gagal menambahkan username. Mohon isi username !!',
        });
        response.code(400);
        return response;
      }
    if(!password) {
      const response = h.response({
          status: 'fail',
          message: 'password salah',
        });
        response.code(400);
        return response;
      }
    if(!email) {
      const response = h.response({
          status: 'fail',
          message: 'password salah',
        });
        response.code(400);
        return response;
      }

    const id_account = nanoid(16);
    const newAccount = {id_account, username, password, email};
    accounts.push(newAccount);
    
    const isSuccess = accounts.filter((account) => account.id_account === id_account).length > 0; 
    if (isSuccess) {
      const response = h.response({
        status: 'success',
        message: 'Anda berhasil registrasi akun',
        data: {
          accountId: id_account
        }
      });
      response.code(201);
      return response;
    }

    const response = h.response({
      status: 'fail',
      message: 'Gagal registrasi',
    });

    response.code(500);
    return response;
};

const Login = (request, h) => {
  const { username, password } = request.payload; 
  if(!username) {
    const response = h.response({
        status: 'fail',
        message: 'Data yang dimasukkan salah atau tidak lengkap !!',
      });
      response.code(400);
      return response;
    }
  if(!password) {
    const response = h.response({
        status: 'fail',
        message: 'Data yang dimasukkan salah atau tidak lengkap',
      });
      response.code(400);
      return response;
    }

    const id_account = nanoid(16);
    const newLogin = {username, password };
    accounts.push(newLogin);
    
    const isSuccess = accounts.filter((account) => account.id_account === id_account).length > 0; 
    if (isSuccess) {
      const response = h.response({
        status: 'success',
        message: 'Anda berhasil Login',
        data: {
          accountId: id_account
        }
      });
      response.code(201);
      return response;
    }

    const response = h.response({
      status: 'fail',
      message: 'Gagal Login',
    });

    response.code(500);
    return response;
};

//logout gw liat gpt rel
const Logout = (request, h) => {
    req.session.destroy(err => {
        if (err) {
          // Handle any error that occurs during session destruction
          console.error('Error during session destruction:', err);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
        // If logout is successful, send a success response
        res.json({ message: 'Logout successful.' });
      });
};

module.exports = {
  Register,
  Login,
  Logout,
};