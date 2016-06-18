"use strict";

module.exports = function(sequelize, DataTypes) {
  var PollOption = sequelize.define("PollOption", {});

  var Option = sequelize.define("Option", {
    name: {type: DataTypes.STRING, allowNull: false},
    description: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        Option.belongsToMany(models.Poll, {through: PollOption});
        Option.hasMany(models.Vote);
      }
    }
  });

  return Option;
};