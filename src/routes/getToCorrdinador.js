const { Router } = require('express');
const {getViajeToCoordinador} = require('../controllers/Coodinador');
const router = Router();

router.post('/', getViajeToCoordinador)



module.exports = router;