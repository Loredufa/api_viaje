const { Router } = require('express');
const {addContrato, getAllContratos} = require('../controllers/Contratos')
const router = Router();


router.post('/', addContrato)
router.get('/', getAllContratos)


module.exports = router;