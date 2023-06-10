const connection = require('../configs/db.config');

const getPupuk = (req, res) => {
  const sqlQuery = 'SELECT * FROM pupuk';
  connection.query(sqlQuery, (err, rows) => {
    if (err) {
      console.log(err);
      res.status(500).send({ message: err.sqlMessage });
    } else {
      res.send(rows);
    }
  });
};

const getHistory = (req, res) => {
  const sqlQuery = 'SELECT * FROM penyakit';
  connection.query(sqlQuery, (err, rows) => {
    if (err) {
      console.log(err);
      res.status(500).send({ message: err.sqlMessage });
    } else {
      res.send(rows);
    }
  });
};

const getNews = (req, res) => {
  const sqlQuery = 'SELECT * FROM berita';
  connection.query(sqlQuery, (err, rows) => {
    if (err) {
      console.log(err);
      res.status(500).send({ message: err.sqlMessage });
    } else {
      res.send(rows);
    }
  });
};

const createHistory = (req, res) => {
  const nama = req.body.nama_penyakit;
  const id = req.body.id_penyakit;
  const description = req.body.description_penyakit;
  const photoUrl = 'dsdsds';

  const sqlQuery = `INSERT INTO penyakittanaman(id, photoUrl, nama, description) VALUES ('${id}', '${photoUrl}', '${nama}', '${description}')`;
  connection.query(sqlQuery, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send({ message: err.sqlMessage });
    } else {
      res.send(result);
    }
  });
};

module.exports = {
  getPupuk, getHistory, getNews, createHistory,
};
