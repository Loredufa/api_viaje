const {Bucket_name, aws_access_key_id, aws_access_secret_key, s3_endpoint} = require('../utils/config')
const AWS = require("aws-sdk") 

//Genero el endpoint
const spacesEndpoint = new AWS.Endpoint(s3_endpoint)
//Defino las credenciales para la coneccion con Digital ocean
const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId: aws_access_key_id,
  secretAccessKey: aws_access_secret_key
})
//Subo el archivo
const uploadFile = async (req, res) => {
    const {image} = req.files
    const timestamp = Date.now(); // Obtiene la marca de tiempo actual en milisegundos
    const uniqueIdentifier = `${image.name}-${timestamp}`;
    console.log('SOY DATE', uniqueIdentifier)
    try {
      const uploadObject = await s3.putObject({
        ACL: 'public-read',
        Bucket: Bucket_name,
        Body: image.data,
        Key: uniqueIdentifier
      }).promise()
      console.log("UPLOAD", uploadObject)
      const urlImage = `https://${Bucket_name}.${s3_endpoint}/${uniqueIdentifier}`;
      const setHeaders = () => {
        res.setHeader('Content-Type', 'application/json');
      };
      setHeaders();
      res.json(urlImage);
    } catch (err) {
      console.log(err)
      res.send(err)
    }
  };

const getFiles = (req, res) => {
    res.send('All')
};

const getSingleFile = (req, res) => {

};


module.exports = {
    uploadFile,
    getFiles,
    getSingleFile
}