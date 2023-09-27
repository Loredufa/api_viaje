const { Router } = require('express');
const {upEmoji} = require('../controllers/Muro')
const router = Router();


router.put('/:id', upEmoji)

module.exports = router;