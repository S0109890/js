const Sequelize = require('sequelize')

module.exports = class Hashtag extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      // hashtag 제목
      title: {
        type: Sequelize.STRING(10),
        allowNull: false,
        unique: true,
      }
    }, {
      sequelize,
      underscored: true, // true: underscored, false: camelCase
      timestamps: true, // createAt, updatedAt
      tableName: 'hashtags',
      paranoid: false, 
      charset: 'utf8mb4', 
      collate: 'utf8mb4_general_ci', // 한글 및 이모티콘 입력 허용
    })
  }

  // static aasociate(db) {
  //   db.Hashtag.belongsToMany(db.Storage, { through: 'StorageHashtag'})
  // }
}
