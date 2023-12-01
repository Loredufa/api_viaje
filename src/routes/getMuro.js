const { Router } = require('express');
const {getMuro, upMuro, postMuro, deleteMuro, getMuroByTravelId } = require('../controllers/Muro')
const router = Router();

router.put('/:id', upMuro)
router.get('/:num', getMuro)
router.get('/get/:id', getMuroByTravelId)
router.post('/:num', postMuro)
router.delete('/:id', deleteMuro)


module.exports = router;