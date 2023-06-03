const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8080;
const routerPath = require('./routes/route')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.listen(port, () => {
    console.log('REST API listening on port:', port);
});

app.get('/', async (req, res) => {
    res.json({status: 'PlantDoc backend is running'});
});

app.use('/plantdoc', routerPath);