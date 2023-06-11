const express = require('express');
const Multer = require('multer');
const imgUpload = require('../configs/imgStorage');
const { login, register } = require('../handlers/auth.handler');
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

router.get('/pupuk', getPupuk);
router.get('/history', getHistory);
router.get('/news', getNews);

router.post('/history', multer.single('file'), imgUpload.uploadToGcs, createHistory);

router.post('/uploadImage', multer.single('file'), imgUpload.uploadToGcs, (req, res, next) => {
  const data = req.body;

  if (req.file && req.file.cloudStoragePublicUrl) {
    data.imageUrl = req.file.cloudStoragePublicUrl;
  }
  res.send(data);
});

module.exports = router;
