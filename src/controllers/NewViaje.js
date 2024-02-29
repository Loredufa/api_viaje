//const {sequelize} = require('../models/index')
const {Contract} = require('../models/index');
const { Travel, sequelize, Op } = require('../models/index')

// Función para crear un nuevo viaje (POST)
const createViaje = async (req, res) => {
  try {
    const {
      destino,
      contratos,
      hotelId,
      scheduleId,
      salida,
      regreso
    } = req.body;
    // Convertir la cadena de contratos a un array de números
    const contratosArray = JSON.parse(contratos);

    const verificationResults = await Promise.all(
      contratosArray.map((el) => verifyContratos(el))
    );

    // Verificar los resultados
    const hasError = verificationResults.some((result) => result.status !== 200);

    if (hasError) {
      // Al menos un contrato no pasó la verificación
      console.log('Al menos un contrato no pasó la verificación')
      const errorMessage = verificationResults.find(
        (result) => result.status !== 200
      ).message;

      res.status(402).send({ message: errorMessage });
    } else {
    // SI, Todos los contratos pasaron la verificación, continuar con la creación del viaje
    // Crea el nuevo viaje y obtiene su ID
    console.log('pasó la verificación')
    const newViaje = await Travel.create({
      destino,
      contratos,
      hotelId,
      scheduleId,
      salida,
      regreso
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
    }}
  } catch (error) {
    console.log("Algo salió mal al crear el viaje:", error);
    res.status(500).send({ mensaje: "Hubo un error al crear el viaje", error });
  }
};

// Verifica que los contratos no estén relacionados con otro viaje
const verifyContratos = async (contratos) => {
  try {
    console.log('VERIFICANDO')
    const contract = await Contract.findOne({
      where: {
        num: `${contratos}`,
      },
    });
    if (contract.travelId === '' || contract.travelId === null) {
      return { status: 200, message: 'OK' };
    } else {
      return {
        status: 402,
        message: `El contrato: ${contract.num} ya tiene el viaje asignado id: ${contract.travelId}`,
      };
    }
  } catch (error) {
    console.log("Algo salió mal al analizar los contratos del viaje:", error);
    return {
      status: 500,
      message: "Hubo un error al analizar los contratos del viaje",
      error: error,
    };
  }
};

//contemplar que el put sea fallido
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