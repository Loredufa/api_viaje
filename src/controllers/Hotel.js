const { Hotel } = require('../models/index')

const getAllHoteles = async (req, res) => {
  try {
    const h = await Hotel.findAll()
    h? res.status(200).send(JSON.stringify(h)) : res.status(401).send({message:'No se encontraron hoteles'})
  } catch (error) { console.log("Algo salio mal: ", error); 
    
}
}

const addHotel = async (req,res) => {
  try {
    const h = req.body
    const newHotel = await Hotel.create(h)
    h? res.status(200).sendJSON.stringify((newHotel)) : res.status(401).send({message:'No se pudo agregar el hotel'})
  } catch (error) { console.log("Algo salio mal: ", error); 
    //throw error; //lanzo el error 
}
}


const getHotelById = async (req, res, next) => {
  try {
    const id = req.params.id
    const h = await Hotel.findByPk(id)
    h? res.status(200).send(JSON.stringify(h)) : res.status(401).send({message:'No se pudo encontrar el hotel'})
  } catch (error) { console.log("Algo salio mal: ", error); 
    
}
}

const putHotel = async (req, res) => {
  try {
    const id = req.params.id
    const h = req.body
    const updateHotel = await Hotel.update(h, {
      where: {
        id,
      },
    })
    updateHotel[0] !== 0? res.status(200).send({message:'Información actualizada'}) : 
    res.status(401).send({message:'No se puede actualizar la información'});
    
  } catch (error) { console.log("Algo salio mal: ", error); 
    
}
}

const deleteHotel = async (req, res, next) => {
  try {
  const id = req.params.id
  const deleteHotel = await Hotel.destroy({
    where: {
      id,
    },
  })
  deleteHotel? res.status(200).send({message:'Hotel eliminado'}) :
  res.status(401).send({message:'No se pudo eliminar el hotel'}) 
  }
  catch (error) { console.log("Algo salio mal: ", error); 
}
}

module.exports = {
  getAllHoteles,
  addHotel,
  getHotelById,
  putHotel,
  deleteHotel

}