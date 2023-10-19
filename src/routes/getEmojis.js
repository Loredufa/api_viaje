const { Router } = require('express');
const {addEmoji, getAllEmojis, putViaje, deleteEmoji} = require('../controllers/Emojis');
const router = Router();

router.get('/', getAllEmojis)
router.put('/:id', putViaje)
router.post('/', addEmoji)
router.delete('/:id', deleteEmoji)


module.exports = router;