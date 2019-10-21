'use strict';
module.exports = (sequelize, DataTypes) => {
  const images = sequelize.define('images', {
    image: DataTypes.STRING,
    rent_id: DataTypes.INTEGER
  }, {});
  images.associate = function(models) {
    images.belongsTo(models.rentlists,{
      as:'rentlists',
      foreignKey:'rent_id'
    })
  };
  return images;
};