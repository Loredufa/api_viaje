const { Router } = require('express');
const {addContrato, getAllContratos, selectContratos, getContratosByNum, putContrato} = require('../controllers/Contratos')
const router = Router();


router.post('/', addContrato)
router.get('/:num', getContratosByNum)
router.get('/', getAllContratos)
router.get('/select', selectContratos)
router.put('/edit/:id', putContrato)


module.exports = router;