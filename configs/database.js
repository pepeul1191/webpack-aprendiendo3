const Sequelize = require('sequelize');
const Op = Sequelize.Op;

/*
const sequelize = new Sequelize('database', 'username', 'password', {
	// host: 'localhost',
	dialect: 'sqlite',
	pool: {
		max: 5,
		min: 0,
		idle: 10000
	},
	storage: 'db/demo.db',
	define: {
		timestamps: false // true by default
	},
	$like: Op.like,
	$not: Op.not, 
	logging: true,
});
*/

const sequelize = new Sequelize('demo', 'root', '123', {
	host: 'localhost',
	dialect: 'mysql',
	pool: {
		max: 5,
		min: 0,
		idle: 10000
	},
	// storage: 'db/demo.db',
	define: {
		timestamps: false // true by default
	},
	$like: Op.like,
	$not: Op.not, 
	logging: true,
});

exports.db = sequelize;
exports.Op = Op;