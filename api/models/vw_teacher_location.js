const Sequelize = require('sequelize');
var database = require('../../configs/database');
const District = require('./district');
const Sex = require('./sex');

var db = database.db;

const VWTeacherLocation = db.define('vw_teachers_locations', {
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
  district_name: { 
    type: Sequelize.STRING, 
    allowNull: false,  
  },
  sex_id: { 
    type: Sequelize.INTEGER, 
    references: {
      model: Sex, 
      key: 'id', 
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  },
  sex_name: { 
    type: Sequelize.STRING, 
    allowNull: false,  
  },
});

module.exports = VWTeacherLocation;