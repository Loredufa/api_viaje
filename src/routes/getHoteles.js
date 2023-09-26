const { Router } = require('express');
const {getAllHoteles, addHotel, getHotelById, putHotel, deleteHotel} = require('../controllers/Hotel');
const router = Router();

router.get('/', getAllHoteles)
router.get('/:id', getHotelById)
router.post('/', addHotel)
router.put('/:id', putHotel)
router.delete('/:id', deleteHotel)


module.exports = router;