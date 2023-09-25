const { Router } = require('express');
const {getAllcronograma, getCronogramaById} = require('../controllers/Cronograma');
const router = Router();

router.get('/', getAllcronograma)
router.get('/:id', getCronogramaById)
//router.put('/:id', upMuro)
//router.post('/:num', postMuro)
//router.delete('/:id', deleteMuro)


module.exports = router;