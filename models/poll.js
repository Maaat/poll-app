"use strict";

module.exports = function(sequelize, DataTypes) {
  var Poll = sequelize.define("Poll", {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    closeTime: {type: DataTypes.DATE},
    closedManually: {type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false}
  }, {
    classMethods: {
      associate: function(models) {
        Poll.belongsTo(models.User);
        Poll.hasMany(models.Option);
      }
    }
  });

  return Poll;
};