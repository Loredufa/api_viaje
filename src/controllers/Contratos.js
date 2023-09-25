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
      throw error; //lanzo el error
  }
  }

  const selectContratos = async (req, res) => {
    try {
      const contrato = await Contract.findAll()
      if (contrato) {
        const contratos = contrato.map((contr) => contr.num).sort((a, b) => b - a)
        res.send(contratos);
      } else {
        res.status(404).send({ mensaje: "No hay ningún contrato" });
      }
    } catch (error) { console.log("Algo salio mal: ", error); 
      //throw error; //lanzo el error
  }
  }

  module.exports = {
    addContrato,
    getAllContratos,
    selectContratos
}