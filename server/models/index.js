'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename);
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config.json')[env];
var db        = {};

if (env=='development') {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}
else {
  var sequelize = new Sequelize("postgres://dnubcsarqkeiuc:5u-g9cCehRg-b77XUXSt2IPTy5@ec2-50-17-220-39.compute-1.amazonaws.com:5432/d5ib88uq0u61pv", {
    logging: false,
    dialectOptions: {
      ssl: true /* for SSL config since Heroku gives you this out of the box */
    }
  });
}

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
