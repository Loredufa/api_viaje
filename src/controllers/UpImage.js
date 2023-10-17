const {Bucket_name, aws_access_key_id, aws_access_secret_key} = require('../utils/config')
const fs = require('fs')
const formidable = require("formidable-serverless")
const aws = require("aws-sdk") 

function handler(req, res){
    const s3 = new aws.S3({
        endpoint: new aws.Endpoint("https://nyc3.digitaloceanspaces.com"),
        accessKeyId: aws_access_key_id,
        secretAccessKey: aws_access_secret_key
    })

    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files)=>{
      if (err) return res.status(500);
      const file = fs.readFileSync(files.file.path);
      console.log(files.file)
      s3.upload({
        Bucket: Bucket_name,
        ACL: "public-read",
        Key: `lazo-file-${files.file.name}`,
        Body: file,
        ContentType: `${files.file.type}`,
      }).send((err, data)=>{
        if (err) {
            console.log('err',err)
            return res.status(500);
          };
          if (data) {
            console.log('data',data)   
            return res.json({
              url:  data.Location,
                });
          };
        })
    
      })
  }
  
module.exports = {
    handler
  };
