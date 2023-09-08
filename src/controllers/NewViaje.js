//const {sequelize} = require('../models/index')
const {Contract} = require('../models/index');
const { Travel } = require('../models/index')

// Función para crear un nuevo viaje (POST)
const createViaje = async (req, res, t) => {
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
  //const t = await sequelize.transaction();
  try {
    const contratos = JSON.parse(req.body.contratos);
    // Llama a la función POST (createViaje) para crear el viaje
    const newViaje = await createViaje(req, res); //agregar t
    // Verifica si la creación del viaje se completó con éxito
    if (!newViaje || !newViaje.id) {
      // Si la creación del viaje falla, lanza una excepción para desencadenar el rollback
      throw new Error("La creación del viaje falló");
    }
    // Captura el travelId del viaje creado
    const newViajeId = newViaje.id;
    console.log("soy newViajeId ",newViajeId);
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
            //{ transaction: t }
          );
        })
      );
      // Confirma la transacción si todas las operaciones se completaron con éxito
      //await t.commit();
      res.send(putContratos);
    } else {
      // Deshace la transacción si contratos no es un array válido
      //await t.rollback();
      res.status(400).send({ mensaje: "Los contratos no son un array válido" });
    }
  } catch (error) {
    console.log("Algo salió mal al actualizar los contratos:", error);

    // Deshace la transacción si ocurre un error
    //await t.rollback();
    res.status(500).send({ mensaje: "Hubo un error al actualizar los contratos: ", error });
  }
};

module.exports = {
  updateContratos
};