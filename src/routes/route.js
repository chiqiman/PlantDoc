const express = require('express');
const router = express.Router();
const Multer = require('multer');
const { getPupuk, getHistory, } = require('../handlers/handler');
/*
const {
    Login,
    Register,
    Logout,
} = require('./authentication');


const route = [
    {
      method: 'POST',
      path: '/accounts',
      handler: Register,
    },
    {
      method: 'POST',
      path: '/accounts',
      handler: Login,
    },
    {
      method: 'POST',
      path: 'accounts',
      handler: Logout,
];
*/


const multer = Multer({
    storage: Multer.memoryStorage,
    fileSize: 5 * 1024 * 1024
});

// router.post('/register', register);
// router.post('/login', login);

router.get('/listPupuk', getPupuk);
router.get('/history', getHistory);

// router.post('/uploadImage', multer.single('image'))

module.exports = router;
