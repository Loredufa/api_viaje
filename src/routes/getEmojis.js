const { Router } = require('express');
const {addEmoji, getAllEmojis, putEmoji, deleteEmoji, getEmojiById} = require('../controllers/Emojis');
const router = Router();

router.get('/', getAllEmojis)
router.get('/:id', getEmojiById)
router.put('/:id', putEmoji)
router.post('/', addEmoji)
router.delete('/:id', deleteEmoji)


module.exports = router;