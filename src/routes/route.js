const express = require('express');
const router = express.Router();
const { getPupuk, getHistory } = require('../handlers/handler');

router.get('/listPupuk', getPupuk);
router.get('/history', getHistory);

module.exports = router;