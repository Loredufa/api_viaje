const { Router } = require('express');
const {createViaje} = require('../controllers/NewViaje');
const {getViajeByContract} = require('../controllers/Viaje')
const router = Router();

router.post('/', createViaje)
router.get('/:contract', getViajeByContract)

module.exports = router;