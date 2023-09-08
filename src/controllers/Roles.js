const { Travel } = require('../models/index')

const getViajeByRoles = async (req, res) => {
  try {
    const rol = req.params.rol
    const contrato = req.params.contrato
    const viaje = await Travel.findAll({
      where: {
        rol,
        contrato    
      },
    })
    res.send(viaje)
  } catch (error) { console.log("Algo salio mal: ", error); 
    throw error; //lanzo el error
}
}

module.exports = {
    getViajeByRoles,
}