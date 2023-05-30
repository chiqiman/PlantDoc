const express = require('express');
const app = express();

const port = 8080;

app.listen(port, () => {
    console.log('REST API listening on port:', port);
});

app.get('/', async (req, res) => {
    res.send({status: 'running'});
});