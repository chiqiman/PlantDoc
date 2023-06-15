const express = require('express');
const Multer = require('multer');
const imgUpload = require('../configs/imgStorage');
const { login, register } = require('../handlers/auth.handler');
const verifyToken = require('../middlewares/jwt.midleware');
const { 
  getPupuk, getHistory, getNews, createHistory,
} = require('../handlers/handler');

const router = express.Router();

const multer = Multer({
  storage: Multer.memoryStorage(),
  fileSize: 5 * 1024 * 1024,
});

router.post('/register', register);
router.post('/login', login);

router.get('/pupuk', verifyToken, getPupuk);
router.get('/history', verifyToken, getHistory);
router.get('/news', verifyToken, getNews);

router.post('/history', verifyToken, multer.single('file'), imgUpload.uploadToGcs, createHistory);

router.post('/uploadImage', multer.single('file'), imgUpload.uploadToGcs, (req, res, next) => {
  const data = req.body;

  if (req.file && req.file.cloudStoragePublicUrl) {
    data.imageUrl = req.file.cloudStoragePublicUrl;
  }
  res.send(data);
});

module.exports = router;
