'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Offer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Offer.init({
    societe: DataTypes.STRING,
    competence: DataTypes.STRING,
    intitule: DataTypes.STRING,
    salaire: DataTypes.INTEGER,
    description: DataTypes.STRING,
    adresse: DataTypes.STRING,
    referent: DataTypes.STRING,
    contrat: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Offer',
    freezeTableName: true
  });
  return Offer;
};
