const { Router } = require('express');
const axios = require ('axios');
const router = Router();

const viajeRoute = require('./getViaje');


router.use('/viaje', viajeRoute)


module.exports = router;