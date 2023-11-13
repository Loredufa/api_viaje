const { Router } = require('express');
const {getViajeToCoordinador} = require('../controllers/Coodinador');
const {getContratosByIdViaje} = require('../controllers/Contratos');
const router = Router();

router.post('/', getViajeToCoordinador)
router.get('/:travelId', getContratosByIdViaje)



module.exports = router;