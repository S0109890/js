const { sequelize } = require('./connection');
const Storage = require('./storage')
// const Hashtag = require('./hashtag')
const db = {};

db.sequelize = sequelize;

// model 생성
db.Storage = Storage;
// db.Hashtag = Hashtag;

// model init
Storage.init(sequelize);
// Hashtag.init(sequelize);

module.exports = db;