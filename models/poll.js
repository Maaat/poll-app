"use strict";

module.exports = function(sequelize, DataTypes) {
  var Poll = sequelize.define("Poll", {
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
    },
    closeTime: {type: DataTypes.DATE},
    closedManually: {type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false}
  }, {
    classMethods: {
      associate: function(models) {
        Poll.belongsTo(models.User, { foreignKey: { allowNull: false } });
        Poll.belongsTo(models.Discussion, { foreignKey: { allowNull: false } });
        Poll.hasMany(models.Option);
      }
    }
  });

  return Poll;
};