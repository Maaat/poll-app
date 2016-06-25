"use strict";

module.exports = function(sequelize, DataTypes) {
  var OptionVote = sequelize.define("OptionVote", {
    
  }, {
    classMethods: {
      associate: function(models) {
        OptionVote.belongsTo(models.User);
        OptionVote.belongsTo(models.Option);
      }
    }
  });

  return OptionVote;
};