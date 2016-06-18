"use strict";

module.exports = function(sequelize, DataTypes) {
  var Tournament = sequelize.define("Tournament", {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Tournament.belongsTo(models.User);
        Tournament.hasMany(models.Round);
      }
    }
  });

  return Tournament;
};