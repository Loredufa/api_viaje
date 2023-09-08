const { Router } = require('express');
const {updateContratos} = require('../controllers/NewViaje');
const router = Router();

router.post('/', updateContratos)

module.exports = router;