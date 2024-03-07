const { Travel, Contract, sequelize, Op} = require('../models/index')

const getAllViaje = async (req, res) => {
  try {
    const viaje = await Travel.findAll()
    res.status(200).send(JSON.stringify(viaje))
  } catch (error) { console.log("Algo salio mal: ", error); 
    
}
}

const getViajeById = async (req, res, next) => {
  try {
    const id = req.params.id
    const viaje = await Travel.findByPk(id)
    viaje? res.status(200).send(viaje) : res.status(401).send({message:'No se pudo encontrar el viaje'})
  } catch (error) { console.log("Algo salio mal: ", error); 
    
}
}

const getViajeByContract = async (req, res, next) => {
  try {
    const contract = req.params.contract;
    const contractFound = await Contract.findOne({
      where: {
        num: contract,
      },
    })
    if (!contractFound) { 
      res.status(402).send({message: 'Contrato no encontrado'})   
    } else {
      const travelId = contractFound.travelId
      const viaje = await Travel.findOne({
      where: {
        id: travelId,
      },
    }) 
    viaje? res.status(200).send(viaje) : res.status(404).send({message:'No encontramos el viaje del contrato ' + contract})
    }    
  } catch (error) { console.log("Algo salio mal: ", error);    
}}

const putViaje = async (req, res) => {
  try {
    const id = req.params.id;
    const viaje = req.body;
    console.log('viaje.contratos = ' + viaje.contratos);

    // Verifica que exista la propiedad viaje en el body
    if ('contratos' in viaje) {
      const stringArray = viaje.contratos;
      const arrContract = JSON.parse(stringArray);
      console.log('array de contratos', arrContract);

      // Si existe, verifica que no sea un array vacío
      if (!Array.isArray(arrContract) || arrContract.length === 0) {
        res.status(405).send({ message: 'El viaje debe tener al menos un contrato relacionado' });
        return;
      }
      // Busca que ningún contrato tenga otro viaje asignado
      const contractPromises = arrContract.map(async (el) => {
        const contract = await Contract.findOne({
          where: {
            num: el.toString(),
            travelId: {
              [Op.not]: null,
              [Op.ne]: id,
            },
          },
        });
        console.log('SOY EL CONTRATO ENCONTRADO', contract);
        return contract;
      });

      // Espera a que terminen todas las solicitudes
      const contracts = await Promise.all(contractPromises);
      console.log('CONTRACTS', contracts);

      // Filtra los contratos que son null
      const validContracts = contracts.filter(contract => contract !== null);
      console.log('VALID CONTRACTS', validContracts);
           // Si NO existe algún contrato asignado a otro viaje y hace la modificación
      if (validContracts.length === 0) {
        const actualizacion = await removeContractsNotInArray(id, arrContract)
        const updateViaje = await Travel.update(viaje, {
          where: {
            id,
          },
        });
        console.log('SOY EL UPDATEVIAJE', updateViaje)
        // Solo si la actualización del viaje es exitosa, actualiza travelId en contratos
        if (updateViaje[0] !== 0) {
          // Actualiza travelId en los contratos existentes
          const updateContractPromises = arrContract.map(async (contract) => {
            await Contract.update({ travelId: id }, {
              where: {
                num: contract
              },
            });
          });
          console.log('SOY EL UPDATE DE CONTRATOS', updateContractPromises)
          // Espera a que terminen todas las solicitudes de actualización de contratos
          await Promise.all(updateContractPromises)

         console.log('SOY LA ACTULIZACUION DE LOS CONTRATOS QUITADOS', actualizacion)

          res.status(200).send({ message: 'Viaje actualizado' });
        } else {
          res.status(402).send({ message: 'Hay un problema con los contratos seleccionados' });
        }
      } else {
        res.status(403).send({ message: 'Alguno de los contratos ya tiene viaje asignado' });
      }
    } else {
      // Si no existe la propiedad contratos, realiza el put de manera normal
      const updateViaje = await Travel.update(viaje, {
        where: {
          id,
        },
      });

      updateViaje[0] !== 0
        ? res.status(200).send({ message: 'Viaje actualizado' })
        : res.status(401).send({ message: 'No se puede actualizar el viaje' });
    }
  } catch (error) {
    console.log("Algo salió mal: ", error);
    res.status(500).send({ message: 'Error interno del servidor' });
  }
};


const removeContractsNotInArray = async (id, arrContract) => {
  try {
    const travelId = id;
    console.log('ESTAMOS EN REMOVE Y SOY EL TRAVELID', travelId);
    console.log('SOY ARRAYCONTRACT EN REMOVE', arrContract)
    // Obtiene los contratos originales asociados al viaje
    const originalContracts = await Travel.findOne({
      where: {
        id: travelId,
      },
    });

    const contractTravel = originalContracts.contratos;
    const arrContractTravel = JSON.parse(contractTravel);
    console.log('SOY ARRCONTRACTTRAVEL EN REMOVE', arrContractTravel);

    // Filtra los contratos originales que no están presentes en el nuevo array
    const contractsToRemove = arrContractTravel.filter(contract => !arrContract.includes(contract));
    console.log('SOY CONTRACTTOREMOVE', contractsToRemove)
    // Actualiza el travelId a null en los contratos a ser removidos
    const updateContractPromises = contractsToRemove.map(async (contract) => {
      await Contract.update({ travelId: null }, {
        where: {
          num: contract.toString(),
        },
      });
    });

    // Espera a que terminen todas las solicitudes de actualización de contratos
    await Promise.all(updateContractPromises);
  } catch (error) {
    console.log('Error al quitar contratos no presentes en el nuevo array: ', error);
  }
};

///////////////////////////////////////////////////////

const deleteViaje = async (req, res, next) => {
  try {
  const id = req.params.id
  const deleteTravel = await Travel.destroy({
    where: {
      id,
    },
  })
  deleteTravel? res.status(200).send({message:'Viaje eliminado'}) :
  res.status(401).send({message:'No se pudo eliminar el viaje'}) 
  }
  catch (error) { console.log("Algo salio mal: ", error); 
}
}

module.exports = {
    getAllViaje,
    getViajeById,
    putViaje,
    deleteViaje,
    getViajeByContract

}