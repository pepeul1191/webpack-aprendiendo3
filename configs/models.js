const Sequelize = require('sequelize');
var database = require('./database');

var db = database.db;

const Carrer = db.define('carrers', {
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

const Teacher = db.define('teachers', {
	id: { 
    type: Sequelize.INTEGER, 
    primaryKey: true, 
    autoIncrement: true ,
  },
	names: { 
    type: Sequelize.STRING, 
    allowNull: false,  
  },
  last_names: { 
    type: Sequelize.STRING, 
    allowNull: false,  
  },
  img: { 
    type: Sequelize.STRING, 
    allowNull: false,  
  },
});

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

exports.Carrer = Carrer;
exports.Teacher = Teacher;
exports.TeacherCarrer = TeacherCarrer;
exports.db = db;