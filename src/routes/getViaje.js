const { Router } = require('express');
const {getAllViaje, addViaje, getViajeById, putViaje, deleteViaje} = require('../controllers/Viaje')
const router = Router();

router.get('/', getAllViaje)
router.get('/:id', getViajeById)
router.post('/', addViaje)
router.put('/:id', putViaje);
router.delete('/:id', deleteViaje);

module.exports = router;