const Sequelize = require('sequelize');
var database = require('./database');

var db = database.db;

const Deparment = db.define('departments', {
	id: { 
    type: Sequelize.INTEGER, 
    primaryKey: true, 
    autoIncrement: true ,
  },
	name: { 
    type: Sequelize.STRING, 
    allowNull: false,  
  },
});

module.exports = Deparment;