const { Travel, Contract, Wall} = require('../models/index')

//Obtiene los valores de la tabla muro de manera descendente para un contrato determinado
const getMuro = async (req, res) => {
  try {
    const num = req.params.num;
    const contractFound = await Contract.findOne({
      where: {
        num: num,
      },
    });

    if (contractFound) {
      const travelId = contractFound.travelId;
      const viaje = await Wall.findAll({
        where: {
          travelId: travelId,
        },
        order: [['createdAt', 'DESC']], // Ordena por createdAt en orden descendente
      });

      if (viaje) {
        res.status(200).send(viaje); // Envía el resultado ordenado
      } else {
        res.status(401).send({ message: 'No se encontraron publicaciones' });
      }
    } else {
      res.status(404).send({ message: 'Contrato no encontrado' });
    }
  } catch (error) {
    console.log("Algo salió mal: ", error);
    res.status(500).send({ message: 'Hubo un error en el servidor' });
  }
};


const postMuro = async (req, res) => {
      try {
        const muro = req.body
        const num = req.params.num
        const contractFound = await Contract.findOne({
          where: {
            num: num,
          },
        }) 
        if (contractFound) {
        const travelId = contractFound.travelId
        const completedMuro = {...muro, travelId: travelId}
        const newMuro = await Wall.create(completedMuro)
        newMuro? res.status(200).send(newMuro) : res.status(401).send({message: 'No se pudo actualizar el muro'})
        }else {
          res.status(400).send({message: 'El contrato no existe'})
        }
      } catch (error) { console.log("Algo salio mal: ", error); 
        //throw error; //lanzo el error 
    }
}

const upMuro = async (req, res) => {
    try {
      const id = req.params.id
      const up = req.body
       //actualizo en la bd
        const updateMuro = await Wall.update(up, {
            where: {
              id : id,
            },
          })
          updateMuro? res.status(200).send({ message: 'Muro actualizado correctamente' }) :
          res.status(404).send({ message: 'No se pudo actualizar el muro' }) 
        } catch (error) { console.log("Algo salio mal: ", error); 
        //throw error; //lanzo el error
    }
}

const upEmoji = async (req, res) => {
  try {
    const id = req.params.id
    const up = req.body  //[{emoji:1}]

     //actualizo en la bd
      const updateMuro = await Wall.update(up, {
          where: {
            id : id,
          },
        })
        updateMuro? res.status(200).send({ message: 'Muro actualizado correctamente' }) :
        res.status(404).send({ message: 'Nose pudo actualizar el muro' }) 
      } catch (error) { console.log("Algo salio mal: ", error); 
      //throw error; //lanzo el error
  }
}

const deleteMuro = async(req, res) => {
  try {
    const id = req.params.id
    const deleteImage = await Wall.destroy({
      where: {
        id,
      },
    })
    deleteImage? res.status(200).send({deleteImage, message: 'Imagen eliminada'}) :
    res.status(401).send({deleteImage, message: 'No se pudo eliminar la imagen'})

  } catch (error) { console.log("Algo salio mal: ", error); 
    //throw error
}
}


module.exports = {
    getMuro,
    upMuro,
    postMuro,
    deleteMuro
}