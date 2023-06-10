const express = require('express');
const bodyParser = require('body-parser');
const routerPath = require('./routes/route');

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log('REST API listening on port:', port);
});

app.get('/plantdoc', (req, res) => {
  res.json({ status: 'PlantDoc backend is running' });
});

app.use('/plantdoc', routerPath);
