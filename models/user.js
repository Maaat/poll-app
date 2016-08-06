"use strict";

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        len: [1,20]
      }
    }
  }, {
    indexes: [
      { name: 'unique_name', unique: true, fields: [sequelize.fn('lower', sequelize.col('name'))] }
    ],
    classMethods: {
      associate: function(models) {
        User.hasOne(models.LoginInfo);
        User.hasMany(models.OptionVote);
        User.hasMany(models.Poll);
      }
    }
  });

  return User;
};