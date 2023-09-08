const { Router } = require('express');
const axios = require ('axios');
const router = Router();

const viajeRoute = require('./getViaje');
//const rolesRoute = require('./getByRol');
const contratoRoute = require('./postContrato');
const nuevoRoute = require('./postViaje')


//router.use('/', rolesRoute)
router.use('/viaje', viajeRoute)
router.use('/nuevoviaje', nuevoRoute)
router.use('/contrato', contratoRoute)


module.exports = router;