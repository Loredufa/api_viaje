const { Router } = require('express');
const {updateContratos} = require('../controllers/NewViaje');
const {getViajeByContract} = require('../controllers/Viaje')
const router = Router();

router.post('/', updateContratos)
router.get('/:contract', getViajeByContract)

module.exports = router;