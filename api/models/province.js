const Sequelize = require('sequelize');
var database = require('../../configs/database');

var db = database.db;

const Province = db.define('provinces', {
	id: { 
    type: Sequelize.INTEGER, 
    primaryKey: true, 
    autoIncrement: true ,
  },
	name: { 
    type: Sequelize.STRING, 
    allowNull: false,  
  },
  department_id: { 
    type: Sequelize.INTEGER, 
    references: {
      model: Deparment, 
      key: 'id', 
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  },
});

module.exports = Province;