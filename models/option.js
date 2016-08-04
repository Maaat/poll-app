"use strict";

module.exports = function(sequelize, DataTypes) {
  var Option = sequelize.define("Option", {
    name: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        len: [1,60]
      }
    },
    description: {
      type: DataTypes.STRING(140),
      validate: {
        max: 140
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        Option.belongsTo(models.Poll, { foreignKey: { allowNull: false } });
        Option.hasMany(models.OptionVote);
      }
    }
  });

  return Option;
};