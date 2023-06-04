const connection = require('../configs/db.config');

const getPupuk = (req, res) => {
    const query = "SELECT * FROM pupuk";
    connection.query(query, (err, results) => {
        if (err) {
            console.log(err);
            res.status(400).json({message: err.message})
        } else {
            res.json({message: 'ok'});
        }
    });
};

const getHistory = (req, res) => {};

module.exports = { getPupuk, getHistory };