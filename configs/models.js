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

const LocationVW = db.define('vw_locations', {
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

exports.Carrer = Carrer;
exports.Teacher = Teacher;
exports.TeacherCarrer = TeacherCarrer;
exports.LocationVW = LocationVW;
exports.Deparment = Deparment;
exports.Province = Province;
exports.District = District;
exports.db = db;