const { Storage } = require('@google-cloud/storage');
const dateFormat = require('dateformat');
const path = require('path');

const pathKey = path.resolve('./serviceaccountkey.json');

const gcs = new Storage({
  projectId: 'plantdoc-387513',
  keyFilename: pathKey,
});

const bucketName = 'plantdoc-images';
const bucket = gcs.bucket(bucketName);

function getPublicUrl(fileName) {
  return `https://storage.googleapis.com/${bucketName}/${fileName}`;
}

let ImgUpload = {};

ImgUpload.uploadToGcs = (req, res, next) => {
  if (!req.file) return next();

  const gcsname = dateFormat(new Date(), 'yyyymmdd-HHMMss');
  const file = bucket.file(gcsname);

  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype,
    },
  });

  stream.on('error', (err) => {
    req.file.cloudStorageError = err;
    next(err);
  });

  stream.on('finish', () => {
    req.file.cloudStorageObject = gcsname;
    req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
    next();
  });

  stream.end(req.file.buffer);

  return console.log('Upload Processing Finished');
};

module.exports = ImgUpload;
