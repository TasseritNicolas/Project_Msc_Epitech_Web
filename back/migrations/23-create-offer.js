'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Offer', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      societe: {
        allowNull: false,
        type: Sequelize.STRING
      },
      competence: {
        allowNull: false,
        type: Sequelize.STRING
      },
      intitule: {
        allowNull: false,
        type: Sequelize.STRING
      },
      salaire: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING
      },
      adresse: {
        allowNull: false,
        type: Sequelize.STRING
      },
      referent: {
        allowNull: false,
        type: Sequelize.STRING
      },
      contrat: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Offer');
  }
};
