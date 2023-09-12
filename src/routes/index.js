const { Router } = require('express');
const axios = require ('axios');
const router = Router();

const viajeRoute = require('./getViaje');
//const rolesRoute = require('./getByRol');
const contratoRoute = require('./postContrato');
const nuevoRoute = require('./postViaje')
const verifyToken = require('../utils/middlewares/verifyToken');


//router.use('/', rolesRoute)
router.use('/viaje', verifyToken, viajeRoute)
router.use('/nuevoviaje', verifyToken, nuevoRoute)
router.use('/contrato', verifyToken, contratoRoute)


module.exports = router;