const Sequelize = require('sequelize');
var database = require('../../configs/database');

var db = database.db;

const Sex = db.define('sexs', {
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

module.exports = Sex;