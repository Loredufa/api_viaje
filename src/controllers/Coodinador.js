const { Contract } = require('../models/index')
const { Op } = require('sequelize');

const getViajeToCoordinador = async (req, res) => {
    try {
      const contratosString = req.body.contratos;
        // Convierte el string JSON a un array
      let contratos;
      try {
        contratos = JSON.parse(contratosString);
      } catch (parseError) {
        res.status(400).send({ message: 'Error al analizar el JSON de contratos' });
        return;
      } 
      if (!Array.isArray(contratos)) {
        res.status(400).send({ message: 'Contratos debe ser un array' });
        return;
      } 
      const allContract = await Promise.all(
        contratos.map(async (contract) => {
          const foundContract = await Contract.findOne({
            where: {
              num: {
                [Op.eq]: String(contract), // Convierte el valor a cadena
              },
            },
          });
      
          return foundContract || null; // Devuelve el contrato encontrado o null si no se encuentra
        })
      );
      if (allContract.length === 0) {
        res.status(404).send({ message: 'El coordinador no tiene ningún contrato asociado' });
      } else {
        const viajes = allContract.map((el) => `${el.colegio}_${el.curso}_${el.division}`);
        res.status(200).send(viajes);
      }
    } catch (error) {
      console.log("Algo salió mal: ", error);
      res.status(500).send({ message: 'Error interno del servidor' });
    }
  };
  
  

  module.exports = {
    getViajeToCoordinador
}