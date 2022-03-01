const { sequelize } = require('./connection');
const Department = require('./department');
const User = require('./user');
const Device = require('./device');

const db = {};

db.sequelize = sequelize;

// model 생성
db.Department = Department;
db.User = User;
db.Device = Device;

// model init
Department.init(sequelize);
User.init(sequelize);
Device.init(sequelize);

module.exports = db;