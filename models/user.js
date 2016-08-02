"use strict";

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    name: {type: DataTypes.STRING, unique: true}
  }, {
    classMethods: {
      associate: function(models) {
        User.hasOne(models.Login);
        User.hasMany(models.OptionVote);
        User.hasMany(models.Poll);
      }
    }
  });

  return User;
};