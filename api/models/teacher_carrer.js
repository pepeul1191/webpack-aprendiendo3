const Sequelize = require('sequelize');
var database = require('./database');

var db = database.db;

const TeacherCarrer = db.define('teachers_carrers', {
	id: { 
    type: Sequelize.INTEGER, 
    primaryKey: true, 
    autoIncrement: true ,
  },
	teacher_id: { 
    type: Sequelize.INTEGER, 
    allowNull: false,  
  },
  carrer_id: { 
    type: Sequelize.INTEGER, 
    allowNull: false,  
  },
});

module.exports = TeacherCarrer;