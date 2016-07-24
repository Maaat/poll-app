"use strict";

module.exports = function(sequelize, DataTypes) {
  var Login = sequelize.define("Login", {
    password: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Login.belongsTo(models.User);
      }
    }
  });

  return Login;
};