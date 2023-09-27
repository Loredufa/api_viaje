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

//Crea una publicacion con una o varias imagenes o videos
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
        //Confirmo que muro sea un array

        //Si no es un array
        const completedMuro = {...muro, travelId: travelId}
        const newMuro = await Wall.create(completedMuro)
        newMuro? res.status(200).send(newMuro) : res.status(401).send({message: 'No se pudo actualizar el muro'})
        }else {
          res.status(400).send({message: 'El contrato no existe'})
        }
        // Si es array
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
    const id = req.params.id;
    const { emoji } = req.body; // Obtenemos el emoji del cuerpo de la solicitud
    let emojis = [];

    // Buscar la publicación por id
    const publicacion = await Wall.findOne({
      where: {
        id,
      },
    });

    if (!publicacion) {
      res.status(401).send({ message: 'No existe la publicación' });
      return;
    } else {
      const foundEmojis = publicacion.emoji;

      if (foundEmojis === null) {
        emojis.push({ [emoji]: 1 }); // Agrega el primer emoji con contador 1
      } else {
        emojis = JSON.parse(foundEmojis);
        const emojiExist = emojis.find((obj) => Object.keys(obj)[0] === emoji);

        if (emojiExist) {
          // Si el emoji ya existe en el array, incrementa su contador
          emojiExist[emoji]++;
        } else {
          // Si el emoji no existe en el array, agrega un nuevo objeto
          emojis.push({ [emoji]: 1 });
        }
      }
    }

    const updateMuro = await Wall.update(
      { emoji: JSON.stringify(emojis) }, // Convierte el array emojis en una cadena JSON
      {
        where: {
          id,
        },
      }
    );

    if (updateMuro[0] !== 0) {
      res.status(200).send({ message: 'Muro actualizado correctamente' });
    } else {
      res.status(404).send({ message: 'No se pudo actualizar el muro' });
    }
  } catch (error) {
    console.log('Algo salió mal: ', error);
    res.status(500).send({ message: 'Hubo un error en el servidor' });
  }
};


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
    deleteMuro,
    upEmoji
}