"use strict";

module.exports = function(sequelize, DataTypes) {
  var LoginInfo = sequelize.define("LoginInfo", {
    passwordHash: DataTypes.STRING(60)
  }, {
    classMethods: {
      associate: function(models) {
        LoginInfo.belongsTo(models.User);
      }
    }
  });

  return LoginInfo;
};