const { Contract, Travel } = require('../models/index')
const { Op } = require('sequelize');

const getViajeToCoordinador = async (req, res) => {
  try {
    const contratos = req.body.contratos;
    if (!Array.isArray(contratos)) {
      res.status(400).send({ message: 'Contratos debe ser un array' });
      return;
    }
    const allContract = await Promise.all(
      contratos.map(async (contract) => {
        const foundContract = await Contract.findOne({
          where: {
            num: {
              [Op.eq]: String(contract),
            },
          },
        });
        return foundContract || null;
      })
    );
    if (allContract.length === 0) {
      res.status(404).send({ message: 'El coordinador no tiene ningún contrato asociado' });
    } else {
      const filteredContracts = allContract.filter(contract => contract !== null);
      const groupedByTravelId = filteredContracts.reduce((groups, el) => {
        const key = el.travelId;
        const value = `${el.colegio}_${el.curso}_${el.division}`;       
        // Agregar al grupo solo si el travelId no es nulo
        if (key !== null) {
          if (!groups[key]) {
            groups[key] = [value];
          } else {
            groups[key].push(value);
          }
        }
        return groups;
      }, {});
      const viajes = await Promise.all(Object.entries(groupedByTravelId).map(async ([travelId, values]) => {
        const travel = await Travel.findOne({
          where: {
            id: {
              [Op.eq]: travelId,
            },
            finViaje: {
              [Op.eq]: false,
            },
          },
        });
        if (travel) {
          return {
            travelId,
            escuelas: values.join('/'),
            inicioViaje: travel.inicioViaje
          };
        }
        return null;
      }));
      const filteredViajes = viajes.filter(viaje => viaje !== null);
      res.status(200).send(JSON.stringify(filteredViajes));
    }
  } catch (error) {
    console.log("Algo salió mal: ", error);
    res.status(500).send({ message: 'Error interno del servidor' });
  }
};

  
const getViajeActivo = async (req, res) => {
    try {
      const contratos = req.body.contratos;
      if (!Array.isArray(contratos)) {
        res.status(400).send({ message: 'Contratos debe ser un array' });
        return;
      } 
      const viajes = await Promise.all(
        contratos.map(async (contract) => {
          const foundContract = await Contract.findOne({
            where: {
              num: {
                [Op.eq]: String(contract),
              },
            },
          });
  
          return foundContract || null;
        })
      );  
      const allActive = await Promise.all(
        viajes.map(async (viaje) => {
          if (!viaje) return null;
  
          const foundActive = await Travel.findOne({
            where: {
              id: viaje.travelId,
              inicioViaje: true,
              finViaje: false,
            },
          });
  
          return foundActive;
        })
      );
      // Eliminar duplicados basados en el ID
      const uniqueActive = allActive
        .filter(Boolean)
        .filter((value, index, self) => self.findIndex((v) => v.id === value.id) === index);
      //console.log('SOY UNIQUEACTIVE', uniqueActive);
      
      if (uniqueActive.length === 0) {
        res.status(404).send({ message: 'El coordinador no tiene ningún viaje activo' });
      
      } else if (uniqueActive.length === 1) {
        res.status(200).send(JSON.stringify(uniqueActive));
      
      } else {
        const activeTravelInfo = uniqueActive.map((travel) => ({
          id: travel.id,
          destino: travel.destino,
        }));
        res.status(403).send({
          message: 'El coordinador tiene más de un viaje activo',
          activeTravels: activeTravelInfo,
        });
      }
    
    } catch (error) {
      console.log("Algo salió mal: ", error);
      res.status(500).send({ message: 'Error interno del servidor' });
    }
  };

module.exports = {
    getViajeToCoordinador,
    getViajeActivo
}