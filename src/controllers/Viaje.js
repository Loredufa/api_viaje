const { Travel } = require('../models/index')

const getAllViaje = async (req, res) => {
  try {
    const viaje = await Travel.findAll()
    res.send(viaje)
  } catch (error) { console.log("Algo salio mal: ", error); 
    throw error; //lanzo el error
}
}

const addViaje = async (req,res) => {
  try {
    const viaje = req.body
    const newViaje = await Travel.create(viaje)
    res.send(newViaje)
  } catch (error) { console.log("Algo salio mal: ", error); 
    throw error; //lanzo el error 
}
}

const getViajeById = async (req, res, next) => {
  try {
    const id = req.params.id
    const viaje = await Travel.findByPk(id)
    res.send(viaje)
  } catch (error) { console.log("Algo salio mal: ", error); 
    throw error; //lanzo el error
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
    throw error; //lanzo el error
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
    addViaje,
    putViaje,
    deleteViaje

}