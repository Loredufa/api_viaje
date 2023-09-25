const { Travel, Contract, Schedule } = require('../models/index')

const getAllcronograma = async (req, res) => {
  try {
    const crono = await Schedule.findAll()
    res.status(200).send(crono) 
  } catch (error) { console.log("Algo salio mal: ", error); 
   // throw error; //lanzo el error
}
}

const getCronogramaById = async (req, res, next) => {
  try {
    const id = req.params.id
    const crono = await Schedule.findByPk(id)
    res.status(200).send(crono)
  } catch (error) { console.log("Algo salio mal: ", error); 
    //throw error; //lanzo el error
}
}

const getCronogramaByContract = async (req, res, next) => {
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
    //throw error; //lanzo el error
}
}

  const addCronograma = async (req,res) => {
    try {
      const contrato = req.body
      const newContrato = await Contract.create(contrato)
      res.send(newContrato);
    } catch (error) { console.log("Algo salio mal: ", error); 
      //throw error; //lanzo el error 
  }
  }

const putCronograma = async (req, res) => {
  try {
    const id = req.params.id
    const viaje = req.body
    const updateViaje = await Travel.update(viaje, {
      where: {
        id,
      },
    })
    updateViaje[0] !== 0? res.status(200).send({message:'Cronograma actualizado'}) : 
    res.status(401).send({message:'No se puede actualizar el cronograma'});

  } catch (error) { console.log("Algo salio mal: ", error); 
    //throw error; //lanzo el error
}
}

const deleteCronograma = (req, res, next) => {
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
    getAllcronograma,
    getCronogramaById,
    putCronograma,
    deleteCronograma,
    getCronogramaByContract,
    addCronograma

}