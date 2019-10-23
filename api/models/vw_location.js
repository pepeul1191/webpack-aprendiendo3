const Sequelize = require('sequelize');
var database = require('./database');

var db = database.db;

const VWLocation = db.define('vw_locations', {
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

module.exports = VWLocation;