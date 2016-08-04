"use strict";

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [1,20]
      }
    }
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