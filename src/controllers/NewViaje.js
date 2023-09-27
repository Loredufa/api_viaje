//const {sequelize} = require('../models/index')
const {Contract} = require('../models/index');
const { Travel } = require('../models/index')

// Función para crear un nuevo viaje (POST)
const createViaje = async (req, res) => {
  try {
    const {
      destino,
      contratos,
      hotelId,
      scheduleId
    } = req.body;

    // Crea el nuevo viaje y obtiene su ID
    const newViaje = await Travel.create({
      destino,
      contratos,
      hotelId,
      scheduleId
    });

    if (newViaje) {
      // Creación del viaje exitosa
      // Extrae el travelId
      const travelId = newViaje.id;

      // Llama a la función para actualizar los contratos
      await updateContratos(req, res, travelId);
    } else {
      // Si no se pudo crear el viaje
      res.status(401).send({ message: 'No se pudo cargar el viaje' });
    }
  } catch (error) {
    console.log("Algo salió mal al crear el viaje:", error);
    res.status(500).send({ mensaje: "Hubo un error al crear el viaje", error });
  }
};

const updateContratos = async (req, res, travelId) => {
  try {
    const contratos = JSON.parse(req.body.contratos);

    if (Array.isArray(contratos)) {
      const putContratos = await Promise.all(
        contratos.map(async (el) => {
          // Actualiza los valores en contratos
          return Contract.update(
            { travelId: travelId },
            {
              where: {
                num: el,
              },
            },
          );
        })
      );
      res.send({ putContratos, travelId });
    } else {
      res.status(400).send({ mensaje: "Los contratos no son un array válido" });
    }
  } catch (error) {
    console.log("Algo salió mal al actualizar los contratos:", error);
    res.status(500).send({ mensaje: "Hubo un error al actualizar los contratos", error });
  }
};


module.exports = {
  createViaje
};