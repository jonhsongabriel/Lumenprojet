const {DataTypes}= require ("sequelize");
const sequelize= require("../db");

const Client=sequelize.define("Client",{
    id:
     {
       type: DataTypes.INTEGER,
       autoIncrement:true,
       primaryKey:true,
    },
    nomclient :
    {
    type:DataTypes.STRING,
    allowNull:false,
    },
    prenomclient:
    {
        type:DataTypes.STRING,
        allowNull:false,
    },
    adresseclient:
    {
        type:DataTypes.STRING,
        allowNull:false,
    },
    contactclient:
    {
        type:DataTypes.STRING,
        allowNull:false,
    },
    emailclient:
    {
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
    }
    

})
module.exports = Client;
