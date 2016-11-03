"use strict";

module.exports = function(sequelize, DataTypes) {
  var Comment = sequelize.define("Comment", {
  	text: {
  		type: DataTypes.STRING(40000),
  		allowNull: false,
  		validate: {
  			len: [0,40000]
  		}
  	}
  }, {
    classMethods: {
      associate: function(models) {
        Comment.belongsTo(models.Discussion, { foreignKey: { allowNull: false } });
        Comment.belongsTo(models.User, { foreignKey: { allowNull: false } });
        Comment.belongsTo(models.Comment);
      }
    }
  });

  return Comment;
};