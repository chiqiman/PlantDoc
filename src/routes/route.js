const express = require('express');
// const Multer = require('multer');
const { 
  getPupuk, getHistory, getNews, createHistory,
} = require('../handlers/handler');
const { login, register } = require('../handlers/auth.handler');

const router = express.Router();

// const multer = Multer({
//   storage: Multer.memoryStorage,
//   fileSize: 5 * 1024 * 1024,
// });

router.post('/register', register);
router.post('/login', login);

router.get('/pupuk', getPupuk);
router.get('/history', getHistory);
router.get('/news', getNews);

router.post('/history', createHistory);

// router.post('/uploadImage', multer.single('image'))

module.exports = router;
