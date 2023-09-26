const { Router } = require('express');
const {getAllcronograma, getCronogramaById, getCronogramaByContract, addCronograma, putCronograma, deleteCronograma} = require('../controllers/Cronograma');
const router = Router();

router.get('/', getAllcronograma)
router.get('/:id', getCronogramaById)
router.get('/:num', getCronogramaByContract)
router.put('/:id', putCronograma)
router.post('/', addCronograma)
router.delete('/:id', deleteCronograma)


module.exports = router;