const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const {s3_endpoint, Bucket_name} = require('../utils/config')


const spacesEndpoint = new aws.Endpoint(s3_endpoint)

const s3 = new aws.S3({
    endpoint: spacesEndpoint
})

const upload = multer ({
    storage: multerS3({
        s3,
        bucket: Bucket_name,
        acl: 'public-read',
        metadata: (req, file, cb) => {
            cb(null,{
                fieldname: file.fieldname
            })
        },
        key:(req, file, cb) => {
            console.log('SOY FILE', file)
            cb(null, file.originalname);
        }
})
}).single('upload')

module.exports = {
    upload,
    s3
  };
