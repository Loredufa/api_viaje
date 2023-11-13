const { Router } = require('express');
const router = Router();

const viajeRoute = require('./getViaje');  
const contratoRoute = require('./postContrato');
const nuevoRoute = require('./postViaje');
const muroRoute = require('./getMuro');
const cronoRoute = require('./getCronograma');
const hotelRoute = require('./getHoteles');
const reaccionRoute = require('./upEmoji');
const selectRoute = require('./getSelect');
const spacesRoute = require('./getSpacesFile');
const emojiRoute = require('./getEmojis');
const coordinadorRoute = require('./getToCorrdinador');
const verifyToken = require('../utils/middlewares/verifyToken');
//const {upload} = require('../libs/multer');



//router.use('/', rolesRoute)
router.use('/viaje', verifyToken, viajeRoute)
router.use('/nuevoviaje', verifyToken, nuevoRoute)
router.use('/contrato', verifyToken, contratoRoute)
router.use('/muro', verifyToken, muroRoute)
router.use('/itinerario', verifyToken, cronoRoute)
router.use('/hoteles', verifyToken, hotelRoute)
router.use('/reaccion', verifyToken, reaccionRoute)
router.use('/select', verifyToken, selectRoute)
router.use('/spaces', spacesRoute)
router.use('/emoji', verifyToken, emojiRoute)
router.use('/coordinador', verifyToken, coordinadorRoute)





module.exports = router;