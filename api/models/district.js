const Sequelize = require('sequelize');
var database = require('../../configs/database');

var db = database.db;

const District = db.define('districts', {
	id: { 
    type: Sequelize.INTEGER, 
    primaryKey: true, 
    autoIncrement: true ,
  },
	name: { 
    type: Sequelize.STRING, 
    allowNull: false,  
  },
  province_id: { 
    type: Sequelize.INTEGER, 
    references: {
      model: Province, 
      key: 'id', 
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  },
});

module.exports = District;