const { Router } = require('express');
const {uploadFile, deleteFile} = require('../controllers/Spaces');


const router = Router();


router.put('/', deleteFile)
router.post('/', uploadFile)



module.exports = router;