const { Router } = require('express');
const {getAllActividad, getActividadById, putActividad, deleteActividad} = require('../controllers/Actividades');
const router = Router();

router.get('/', getAllActividad)
router.get('/:id', getActividadById)
router.put('/:id', putActividad)
router.delete('/:id', deleteActividad)


module.exports = router;