const { Router } = require('express');
const axios = require ('axios');
const router = Router();

const viajeRoute = require('./getViaje');
const contratoRoute = require('./postContrato');
const nuevoRoute = require('./postViaje');
const muroRoute = require('./getMuro');
const verifyToken = require('../utils/middlewares/verifyToken');


//router.use('/', rolesRoute)
router.use('/viaje', verifyToken, viajeRoute)
router.use('/nuevoviaje', verifyToken, nuevoRoute)
router.use('/contrato', verifyToken, contratoRoute)
router.use('/muro', verifyToken, muroRoute)


module.exports = router;