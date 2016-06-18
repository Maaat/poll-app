"use strict";

module.exports = function(sequelize, DataTypes) {
  var Round = sequelize.define("Round", {
    number: {type: DataTypes.INTEGER, allowNull: false}
  }, {
    classMethods: {
      associate: function(models) {
        Round.belongsTo(models.Tournament);
        Round.hasMany(models.Poll);
      }
    }
  });

  return Round;
};