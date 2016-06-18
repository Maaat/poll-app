"use strict";

module.exports = function(sequelize, DataTypes) {
  var Poll = sequelize.define("Poll", {
    name: DataTypes.STRING,
    closeTime: {type: DataTypes.DATE},
    closedManually: {type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false}
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