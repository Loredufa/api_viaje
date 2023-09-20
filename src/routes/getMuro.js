const { Router } = require('express');
const {getMuro, upMuro, postMuro} = require('../controllers/Muro')
const router = Router();

router.put('/:id', upMuro)
router.get('/:num', getMuro)
router.post('/:num', postMuro)


module.exports = router;