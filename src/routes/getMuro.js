const { Router } = require('express');
const {getMuro, upMuro, postMuro, deleteMuro, getMuroByTravelId, postMuroByTravelId } = require('../controllers/Muro')
const router = Router();

router.put('/:id', upMuro)
router.get('/:num', getMuro)
router.get('/get/:id', getMuroByTravelId)
router.post('/:num', postMuro)
router.post('/post/:id', postMuroByTravelId)
router.delete('/:id', deleteMuro)


module.exports = router;