"use strict";

module.exports = function(sequelize, DataTypes) {

  var Option = sequelize.define("Option", {
    name: {type: DataTypes.STRING, allowNull: false},
    description: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        Option.belongsTo(models.Poll);
        Option.hasMany(models.OptionVote);
      }
    }
  });

  return Option;
};