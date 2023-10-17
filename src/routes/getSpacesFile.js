const { Router } = require('express');
const {uploadFile, getFiles, getSingleFile} = require('../controllers/Spaces');
const {upload} = require('../libs/multer');
const router = Router();

router.get('/', getFiles)
//router.put('/:id', putCronograma)
router.post('/', upload, uploadFile)
//router.delete('/:id', deleteCronograma)


module.exports = router;