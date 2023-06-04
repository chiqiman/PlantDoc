const express = require('express');
const router = express.Router();
const { getPupuk, getHistory } = require('../handlers/handler');

router.post('/register', register);
router.post('/login', login);

router.get('/listPupuk', getPupuk);
router.get('/history', getHistory);

module.exports = router;