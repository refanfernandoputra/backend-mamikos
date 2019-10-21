'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('rentlists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        references:{
          model:'users',
          key:'id'
        },
        onDelete:'cascade',
        onUpdate:'cascade'
      },
      rentname: {
        type: Sequelize.STRING
      },
      rentaddress: {
        type: Sequelize.STRING
      },
      town: {
        type: Sequelize.STRING
      },
      latitude: {
        type: Sequelize.STRING
      },
      longtitude: {
        type: Sequelize.STRING
      },
      roomsleft: {
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.DOUBLE
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('rentlists');
  }
};