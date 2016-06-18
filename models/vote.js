"use strict";

module.exports = function(sequelize, DataTypes) {
  var Vote = sequelize.define("Vote", {
    
  }, {
    classMethods: {
      associate: function(models) {
        Vote.belongsTo(models.User);
        Vote.belongsTo(models.Poll);
        Vote.belongsTo(models.Option);
      }
    }
  });

  return Vote;
};