const { Storage } = require('@google-cloud/storage');
const path = require('path');

const pathKey = path.resolve('./serviceaccountkey.json');

const gcs = new Storage({
    projectId: '',
    keyFilename: pathKey
});

const bucketName = 'name'
const bucket = gcs.bucket(bucketName);

function getPublicUrl(fileName) {
    return 'https://storage.googleapis.com/' + bucketName + '/' + fileName;
}