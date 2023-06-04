const connection = require('../configs/db.config');

const getPupuk = (req, res) => {
    const query = "SELECT * FROM pupuk";
    connection.query(query, (err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).send({message: err.sqlMessage})
        } else {
            res.json(rows);
        }
    });
};

const getHistory = (req, res) => {
    const query = "SELECT * FROM history";
    connection.query(query, (err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).send({message: err.sqlMessage})
        } else {
            res.json(rows);
        }
    });
};

module.exports = { getPupuk, getHistory };