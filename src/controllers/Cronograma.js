const { Travel, Contract, Schedule } = require('../models/index')

const getAllcronograma = async (req, res) => {
  try {
    const crono = await Schedule.findAll()
    res.status(200).send(JSON.stringify(crono)) 
  } catch (error) { console.log("Algo salio mal: ", error); 
   // throw error; //lanzo el error
}
}

const getCronogramaById = async (req, res, next) => {
  try {
    const id = req.params.id
    const crono = await Schedule.findByPk(id)
    crono? res.status(200).send(JSON.stringify(crono)) : res.status(401).send({ message: 'El id del cronograma no existe' })
  } catch (error) { console.log("Algo salio mal: ", error); 
    //throw error; //lanzo el error
}
}

const getCronogramaByContract = async (req, res, next) => {
  try {
    const num = req.params.num;
    const contractFound = await Contract.findOne({
      where: {
        num,
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
    if (!viaje) {res.status(404).send({message:'No se encontro el viaje para ese contrato'})}
    else {
    const scheduleId = viaje.scheduleId
    const crono = await Schedule.findOne({
      where: {
        id: scheduleId,
      },
    }) 
    crono? res.status(200).send(JSON.stringify(crono)) : res.status(404).send({message:'No se encontro el itinerario'})
    }
    
  }} catch (error) { console.log("Algo salio mal: ", error); 
    //throw error; //lanzo el error
}
}


  const addCronograma = async (req,res) => {
    try {
      const crono = req.body
      const newCronograma = await Schedule.create(crono)
      newCronograma? res.status(200).send({message:'Se agregó el itinerario'}) : 
      res.status(404).send({message:'No se pudo agregar el itinerario'})
    } catch (error) { console.log("Algo salio mal: ", error); 
      //throw error; //lanzo el error 
  }
  }

const putCronograma = async (req, res) => {
  try {
    const id = req.params.id
    const crono = req.body
    const updateCrono = await Schedule.update(crono, {
      where: {
        id,
      },
    })
    updateCrono[0] !== 0? res.status(200).send({message:'Cronograma actualizado'}) : 
    res.status(401).send({message:'No se puede actualizar el cronograma'});

  } catch (error) { console.log("Algo salio mal: ", error); 
    //throw error; //lanzo el error
}
}

const deleteCronograma = async (req, res, next) => {
  try {
  const id = req.params.id
  const deleteCrono = await Schedule.destroy({
    where: {
      id,
    },
  })
  deleteCrono? res.status(200).send({message:'Cronograma eliminado'}) :
  res.status(401).send({message:'No se pudo eliminar el cronograma'}) 
  }
  catch (error) { console.log("Algo salio mal: ", error); 
}
}

module.exports = {
    getAllcronograma,
    getCronogramaById,
    putCronograma,
    deleteCronograma,
    getCronogramaByContract,
    addCronograma

}