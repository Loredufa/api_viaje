const { Router } = require('express');
const {getAllExcursiones, getExcursionById, putExcursion, deleteExcursion, addExcursion} = require('../controllers/Excursiones');
const router = Router();

router.get('/', getAllExcursiones)
router.get('/:id', getExcursionById)
router.post('/', addExcursion)
router.put('/:id', putExcursion)
router.delete('/:id', deleteExcursion)


module.exports = router;