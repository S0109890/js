const { sequelize } = require('./connection');
const Storage = require('./storage')
const db = {};

db.sequelize = sequelize;

// model 생성
db.Storage = Storage;

// model init
Storage.init(sequelize);

module.exports = db;