const { Activity } = require('../models/index')

const getAllActividad = async (req, res) => {
  try {
    const actividad = await Activity.findAll()
    res.status(200).send(actividad) 
  } catch (error) { console.log("Algo salio mal: ", error); 
    
}
}

const getActividadById = async (req, res, next) => {
  try {
    const id = req.params.id
    const act = await Activity.findByPk(id)
    res.send(act)
  } catch (error) { console.log("Algo salio mal: ", error);  
}}

const putActividad = async (req, res) => {
  try {
    const id = req.params.id
    const act = req.body
    const updateAct = await Activity.update(act, {
      where: {
        id,
      },
    })
    updateAct[0] !== 0? res.status(200).send({message:'Actividad actualizada'}) : 
    res.status(401).send({message:'No se puede actualizar la actividad'});
  } catch (error) { console.log("Algo salio mal: ", error); 
    
}
}

const deleteActividad = (req, res, next) => {
  const id = req.params.id
  return Activity.destroy({
    where: {
      id,
    },
  }).then(() => {
    res.sendStatus(200)
  }).catch((error) => next(error))
}

module.exports = {
    getAllActividad,
    getActividadById,
    putActividad,
    deleteActividad

}