const { Travel, Contract } = require('../models/index')

const getAllViaje = async (req, res) => {
  try {
    const viaje = await Travel.findAll()
    res.status(200).send(viaje) 
  } catch (error) { console.log("Algo salio mal: ", error); 
    
}
}

const getViajeById = async (req, res, next) => {
  try {
    const id = req.params.id
    const viaje = await Travel.findByPk(id)
    res.send(viaje)
  } catch (error) { console.log("Algo salio mal: ", error); 
    
}
}

const getViajeByContract = async (req, res, next) => {
  try {
    const contract = req.params.contract;
    const contractFound = await Contract.findOne({
      where: {
        num: contract,
      },
    })
    if (!contractFound) { 
      res.status(404).send({message: 'Contrato no encontrado'})   
    } else {
      const travelId = contractFound.travelId
      const viaje = await Travel.findOne({
      where: {
        id: travelId,
      },
    }) 
    viaje? res.status(200).send(viaje) : res.status(404).send({message:'No se pudo crear el viaje'})
    }
    
  } catch (error) { console.log("Algo salio mal: ", error); 
   
}
}

const putViaje = async (req, res) => {
  try {
    const id = req.params.id
    const viaje = req.body
    const updateViaje = await Travel.update(viaje, {
      where: {
        id,
      },
    })
    res.send(updateViaje)
  } catch (error) { console.log("Algo salio mal: ", error); 
    
}
}

const deleteViaje = (req, res, next) => {
  const id = req.params.id
  return Travel.destroy({
    where: {
      id,
    },
  }).then(() => {
    res.sendStatus(200)
  }).catch((error) => next(error))
}

module.exports = {
    getAllViaje,
    getViajeById,
    putViaje,
    deleteViaje,
    getViajeByContract

}