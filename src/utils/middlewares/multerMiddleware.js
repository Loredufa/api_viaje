const multer = require('multer');

const multerMiddleware = (req, res, next) => {
  
  multer().single('file', {
    // ...
  }).parse(req, res, next);
};

  module.exports = multerMiddleware;