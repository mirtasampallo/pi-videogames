const { DataTypes, UUIDV4 } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
    id:{
      type: DataTypes.UUID,
      allowNull:false,
      primaryKey:true,
      defaultValue: UUIDV4(),
    }, 
 
     description: {    
       type: DataTypes.TEXT,
       allowNull: true,  
     },  
   
     platforms: {
       type: DataTypes.STRING,
       allowNull: false
     },
     
     released: {
       type: DataTypes.TEXT   
     },  
 
     rating: {
       type: DataTypes.NUMERIC,    
     }, 
 
     image: {
       type: DataTypes.TEXT,
        
     }, 

     platforms: {
      type: DataTypes.TEXT,
     },

    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
   },
   
   {timestamps: false},
   
   );  
  }
