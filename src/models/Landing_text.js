const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = function(sequelize) {
  // defino el modelo
  return sequelize.define('landing_text', {
    id:  {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: true,
      },
    texto: {
      type: DataTypes.STRING,
      allowNull: true,
      },
    posicion: {
      type: DataTypes.STRING,
      allowNull: true,
    },    
    activo: {
      type:DataTypes.STRING,
      allowNull:true,
    }
  })
  };