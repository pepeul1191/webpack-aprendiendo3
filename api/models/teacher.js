const Sequelize = require('sequelize');
var database = require('./database');

var db = database.db;

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
  district_id: { 
    type: Sequelize.INTEGER, 
    references: {
      model: District, 
      key: 'id', 
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  },
  sex_id: { 
    type: Sequelize.INTEGER, 
    references: {
      model: Sex, 
      key: 'id', 
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  },
});

module.exports = Teacher;