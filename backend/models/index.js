const { sequelize } = require('./connection');
const Storage = require('./storage')
<<<<<<< HEAD
=======
// const Hashtag = require('./hashtag')
>>>>>>> 1d8ca5f5d2b1433c41c3c08939d53858078dbc82
const db = {};

db.sequelize = sequelize;

// model 생성
db.Storage = Storage;
<<<<<<< HEAD

// model init
Storage.init(sequelize);
=======
// db.Hashtag = Hashtag;

// model init
Storage.init(sequelize);
// Hashtag.init(sequelize);
>>>>>>> 1d8ca5f5d2b1433c41c3c08939d53858078dbc82

module.exports = db;