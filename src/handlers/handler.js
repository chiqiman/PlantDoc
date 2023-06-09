const connection = require('../configs/db.config');

const getPupuk = (req, res) => {
  const sqlQuery = 'SELECT * FROM pupuk';
  connection.query(sqlQuery, (err, rows) => {
    if (err) {
      console.log(err);
      res.status(500).send({ message: err.message });
    } else {
      res.send(rows);
    }
  });
};

const getHistory = (req, res) => {
  const sqlQuery = 'SELECT * FROM penyakittanaman';
  connection.query(sqlQuery, (err, rows) => {
    if (err) {
      console.log(err);
      res.status(500).send({ message: err.message });
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
      res.status(500).send({ message: err.message });
    } else {
      res.send(rows);
    }
  });
};

const createHistory = (req, res) => {
  const nama = req.body.nama_penyakit;
  const description = req.body.description_penyakit;
  let photoUrl = '';

  if (req.file && req.file.cloudStoragePublicUrl) {
    photoUrl = req.file.cloudStoragePublicUrl;
  }

  const sqlQuery = `INSERT INTO penyakittanaman (photoUrl, nama, description) VALUES ('${photoUrl}', '${nama}', '${description}')`;
  connection.query(sqlQuery, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send({ message: err.message });
    } else {
      res.send({ message: 'Insert Data Successful' });
    }
  });
};

module.exports = {
  getPupuk, getHistory, getNews, createHistory,
};
