const { Router } = require('express');
const {uploadFile, getFiles, getSingleFile} = require('../controllers/Spaces');
//const { uploadFile } = require('../controllers/Upload');

const router = Router();

//router.get('/', getFiles)
//router.put('/:id', putCronograma)
router.post('/', uploadFile)
//router.delete('/:id', deleteCronograma)


module.exports = router;