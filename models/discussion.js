"use strict";

module.exports = function(sequelize, DataTypes) {
  var Discussion = sequelize.define("Discussion", {

  }, {
    classMethods: {
      associate: function(models) {
        Discussion.hasMany(models.Comment);
      }
    }
  });

  return Discussion;
};