const Sequelize = require('sequelize');
var database = require('../../configs/database');

var db = database.db;

const Image = db.define('images', {
	id: { 
    type: Sequelize.INTEGER, 
    primaryKey: true, 
    autoIncrement: true ,
  },
	name: { 
    type: Sequelize.STRING, 
    allowNull: false,  
  },
	url: { 
    type: Sequelize.STRING, 
    allowNull: false,  
  },
});

module.exports = Image;