//const {sequelize} = require('../models/index')
const {Contract} = require('../models/index');
const { Travel } = require('../models/index')

// Función para crear un nuevo viaje (POST)
const createViaje = async (req, res) => {
  try {
    const {
      hotel,
      ubicHotel,
      fotosHotel,
      videoHotel,
      estadia,
      cronograma,
      menu,
      coordinador,
      contratos,
    } = req.body;

    // Crea el nuevo viaje y obtiene su ID
    const newViaje = await Travel.create(
      {
        hotel,
        ubicHotel,
        fotosHotel,
        videoHotel,
        estadia,
        cronograma,
        menu,
        coordinador,
        contratos
      },
      //{ transaction: t }
    );

    return newViaje; // Devuelve el objeto del viaje creado
  } catch (error) {
    console.log("Algo salió mal al crear el viaje:", error);
    throw error; // Lanza una excepción para desencadenar el rollback
  }
};

// Función para actualizar contratos con el ID del viaje creado (PUT)
const updateContratos = async (req, res) => {
  try {
    const contratos = JSON.parse(req.body.contratos);
    // Llama a la función POST para crear el viaje
    const newViaje = await createViaje(req, res); 
    // Verifica si la creación del viaje se completó con éxito
    if (!newViaje || !newViaje.id) {
      throw new Error("La creación del viaje falló");
    }
    // Captura el travelId del viaje creado
    const newViajeId = newViaje.id;
    //verifica que contratos sea un array
    if (Array.isArray(contratos)) {
      const putContratos = await Promise.all(
        contratos.map(async (el) => {
    //Actualiza los valores en contratos
          return Contract.update(
            { travelId: newViajeId },
            {
              where: {
                num: el,
              },
            },
          );
        })
      );
      res.send({putContratos, newViaje});
    } else {
      res.status(400).send({ mensaje: "Los contratos no son un array válido" });
    }
  } catch (error) {
    console.log("Algo salió mal al actualizar los contratos:", error);
    res.status(500).send({ mensaje: "Hubo un error al actualizar los contratos: ", error });
  }
};

module.exports = {
  updateContratos
};