const { Router } = require('express');
const {getViajeToCoordinador, getViajeActivo} = require('../controllers/Coodinador');
const {getContratosByIdViaje} = require('../controllers/Contratos');
const router = Router();

router.post('/', getViajeToCoordinador)
router.put('/', getViajeActivo)
router.get('/:travelId', getContratosByIdViaje)



module.exports = router;