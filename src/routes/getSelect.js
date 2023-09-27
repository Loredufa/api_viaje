const { Router } = require('express');
const {selectContratos} = require('../controllers/Contratos')
const router = Router();


router.get('/', selectContratos)


module.exports = router;