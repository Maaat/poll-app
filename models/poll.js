"use strict";

module.exports = function(sequelize, DataTypes) {
  var Poll = sequelize.define("Poll", {
    name: DataTypes.STRING,
    closeTime: {type: DataTypes.DATE, allowNull: false},
    closedManually: {type: DataTypes.BOOLEAN, defaultValue: false}
  }, {
    classMethods: {
      associate: function(models) {
        Poll.belongsTo(models.User);
        Poll.belongsTo(models.Round);
        Poll.hasMany(models.Option);
      }
    }
  });

  return Poll;
};