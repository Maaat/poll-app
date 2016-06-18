"use strict";

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Vote);
        User.hasMany(models.Poll);
        User.hasMany(models.Tournament);
      }
    }
  });

  return User;
};