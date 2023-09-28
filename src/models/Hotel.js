const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = function(sequelize) {
  // defino el modelo
  return sequelize.define('hotel', {
    id:  {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      },
    
    direccion: {
      type:DataTypes.STRING,
      allowNull:true,
    },
    fotos: {
      type:DataTypes.STRING,
      allowNull:true,
    },
    video: {
      type:DataTypes.STRING,
      allowNull:true,
    }
  })

  };