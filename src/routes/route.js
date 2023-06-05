const express = require('express');
const router = express.Router();
const Multer = require('multer');
const { getPupuk, getHistory, } = require('../handlers/handler');
const { login, register, logout } = require('../handlers/auth.handler');

/*
const {Login,Register, Logout,} = require('./authentication');
app.post('/accounts', Logout);
*/

const multer = Multer({
    storage: Multer.memoryStorage,
    fileSize: 5 * 1024 * 1024
});

router.post('/register', register);
router.post('/login', login);

router.get('/pupuk', getPupuk);
router.get('/history', getHistory);

// router.post('/uploadImage', multer.single('image'))

module.exports = router;
