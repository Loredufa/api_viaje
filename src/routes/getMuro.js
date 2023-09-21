const { Router } = require('express');
const {getMuro, upMuro, postMuro, deleteMuro} = require('../controllers/Muro')
const router = Router();

router.put('/:id', upMuro)
router.get('/:num', getMuro)
router.post('/:num', postMuro)
router.delete('/:id', deleteMuro)


module.exports = router;