const { Excursion } = require('../models/index')

const getAllExcursiones = async (req, res) => {
  try {
    const exc = await Excursion.findAll()
    res.status(200).send(exc) 
  } catch (error) { console.log("Algo salio mal: ", error); 
    
}
}

const addExcursion = async (req,res) => {
  try {
    const exc = req.body
    const newExc = await Excursion.create(exc)
    res.send(newExc);
  } catch (error) { console.log("Algo salio mal: ", error); 
    //throw error; //lanzo el error 
}
}


const getExcursionById = async (req, res, next) => {
  try {
    const id = req.params.id
    const exc = await Excursion.findByPk(id)
    res.send(exc)
  } catch (error) { console.log("Algo salio mal: ", error); 
    
}
}

const putExcursion = async (req, res) => {
  try {
    const id = req.params.id
    const exc = req.body
    const updateExc = await Excursion.update(exc, {
      where: {
        id,
      },
    })
    updateExc[0] !== 0? res.status(200).send({message:'Excursión actualizada'}) : 
    res.status(401).send({message:'No se puede actualizar la excursion'});
    
  } catch (error) { console.log("Algo salio mal: ", error); 
    
}
}

const deleteExcursion = (req, res, next) => {
  const id = req.params.id
  return Excursion.destroy({
    where: {
      id,
    },
  }).then(() => {
    res.sendStatus(200)
  }).catch((error) => next(error))
}

module.exports = {
    getAllExcursiones,
    getExcursionById,
    putExcursion,
    addExcursion,
    deleteExcursion

}