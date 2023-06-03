const express = require('express');
const router = express.Router();
const getPupuk = require('../handlers/handler');

router.get('/listPupuk', getPupuk);
//router.get('/history', getHistory);

module.exports = router;