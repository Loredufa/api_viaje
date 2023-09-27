const { Router } = require('express');
const router = Router();

const viajeRoute = require('./getViaje');
const contratoRoute = require('./postContrato');
const nuevoRoute = require('./postViaje');
const muroRoute = require('./getMuro');
const cronoRoute = require('./getCronograma');
const hotelRoute = require('./getHoteles');
const emojiRoute = require('./upEmoji');
const verifyToken = require('../utils/middlewares/verifyToken');


//router.use('/', rolesRoute)
router.use('/viaje', verifyToken, viajeRoute)
router.use('/nuevoviaje', verifyToken, nuevoRoute)
router.use('/contrato', verifyToken, contratoRoute)
router.use('/muro', verifyToken, muroRoute)
router.use('/itinerario', verifyToken, cronoRoute)
router.use('/hoteles', verifyToken, hotelRoute)
router.use('/reaccion', verifyToken, emojiRoute)



module.exports = router;