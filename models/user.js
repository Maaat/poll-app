"use strict";

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.OptionVote);
        User.hasMany(models.Poll);
        User.hasMany(models.Tournament);
      }
    }
  });

  return User;
};