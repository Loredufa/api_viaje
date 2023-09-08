const { Router } = require('express');
const {getAllViaje, getViajeById, putViaje, deleteViaje} = require('../controllers/Viaje')
const router = Router();

router.get('/', getAllViaje)
router.get('/:id', getViajeById)
router.put('/:id', putViaje);
router.delete('/:id', deleteViaje);

module.exports = router;