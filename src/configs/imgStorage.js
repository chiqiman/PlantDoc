const { Storage } = require('@google-cloud/storage');
const path = require('path');

const pathKey = path.resolve('./serviceaccountkey.json');

const gcs = new Storage({
  projectId: '',
  keyFilename: pathKey,
});

const bucketName = 'name';
// eslint-disable-next-line no-unused-vars
const bucket = gcs.bucket(bucketName);

// eslint-disable-next-line no-unused-vars
function getPublicUrl(fileName) {
  return `https://storage.googleapis.com/${bucketName}/${fileName}`;
}
