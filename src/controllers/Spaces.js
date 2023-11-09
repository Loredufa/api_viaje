const {Bucket_name, aws_access_key_id, aws_access_secret_key, s3_endpoint} = require('../utils/config')
const AWS = require("aws-sdk") 
const sharp = require('sharp');

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
    console.log('SOY EL REQUEST', req.files)
    const {image} = req.files
    const timestamp = Date.now(); // Obtiene la marca de tiempo actual en milisegundos
    const uniqueIdentifier = `${timestamp}-${image.name}`;
    try {
      // Obtener dimensiones de la imagen con sharp
      const metadata = await sharp(image.data).metadata();
      const width = metadata.width;
      const height = metadata.height;

      console.log('Ancho de la imagen:', width);
      console.log('Alto de la imagen:', height);

      const uploadObject = await s3.putObject({
        ACL: 'public-read',
        Bucket: Bucket_name,
        Body: image.data,
        Key: uniqueIdentifier  //agrego timestamp para hacerlo unico
      }).promise()
      console.log('SOY UOLOADOBJECT', uploadObject)
      //Genero url para retornar
      const urlImage = `https://${Bucket_name}.${s3_endpoint}/${uniqueIdentifier}`;
      const setHeaders = () => {
        res.setHeader('Content-Type', 'application/json');
      };
      setHeaders();
      res.json(urlImage, width, height);
    } catch (err) {
      console.log(err)
      res.send(err)
    }
  };

const deleteFile = async (req, res) => {
  const {image} = req.body
  try {
    const url = image
    const regex = /\/([^/]+)$/; // Expresión regular para capturar la parte final de la URL
    const match = url.match(regex);
    if (match && match[1]) {
    const extractedPart = match[1];
    const deleteImage = await s3.deleteObject({
      Bucket: Bucket_name,
      Key: extractedPart
    }).promise();
      res.json({message: 'Imagen eliminada'});
    } else {
      res.json({message: 'Imagen eliminada'});
    }
  } catch (err) {
    console.log(err)
    res.send(err)
    }
};


module.exports = {
    uploadFile,
    deleteFile
}