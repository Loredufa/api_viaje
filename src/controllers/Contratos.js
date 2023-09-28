const { Contract } = require('../models/index')

const addContrato = async (req,res) => {
    try {
      const contrato = req.body
      const newContrato = await Contract.create(contrato)
      res.send(newContrato);
    } catch (error) { console.log("Algo salio mal: ", error); 
  }
  }

  const getAllContratos = async (req, res) => {
    try {
      const viaje = await Contract.findAll()
      if (viaje) {
        res.send(viaje);
      } else {
        res.status(404).send({ mensaje: "Contratos no encontrado" });
      }
    } catch (error) { console.log("Algo salio mal: ", error); 
  
  }
  }

  const selectContratos = async (req, res) => {
    try {
      const contratos = await Contract.findAll();
      if (contratos.length > 0) {
        // Ordena los contratos en orden descendente según el campo 'num'
        const contratosOrdenados = contratos
          .slice() // Hacemos una copia para no modificar el array original
          .sort((a, b) => b.num - a.num);
  
        // Mapea los contratos para incluir el campo 'colegio'
        const contratosConColegio = contratosOrdenados.map((contrato) => ({
          num: contrato.num,
          colegio: contrato.colegio,
        }));
  
        res.status(200).send(contratosConColegio);
      } else {
        res.status(404).send({ mensaje: "No hay ningún contrato" });
      }
    } catch (error) {
      console.log("Algo salió mal: ", error);
      // Manejo de errores
      res.status(500).send({ mensaje: "Ocurrió un error interno" });
    }
  };
  

  module.exports = {
    addContrato,
    getAllContratos,
    selectContratos
}