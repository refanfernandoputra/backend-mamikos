'use strict';
module.exports = (sequelize, DataTypes) => {
  const rentlists = sequelize.define('rentlists', {
    user_id: DataTypes.INTEGER,
    rentname: DataTypes.STRING,
    rentaddress: DataTypes.STRING,
    town: DataTypes.STRING,
    latitude: DataTypes.STRING,
    longtitude: DataTypes.STRING,
    roomsleft: DataTypes.INTEGER,
    price: DataTypes.DOUBLE
  }, {});
  rentlists.associate = function(models) {
    rentlists.belongsTo(models.users,{
      as:'users',
      foreignKey:'user_id'
    })
  };
  return rentlists;
};