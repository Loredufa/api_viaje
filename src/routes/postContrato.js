const { Router } = require('express');
const {addContrato, getAllContratos, selectContratos} = require('../controllers/Contratos')
const router = Router();


router.post('/', addContrato)
router.get('/', getAllContratos)
router.get('/select', selectContratos)


module.exports = router;