const { Model } = require('sequelize')
const Sequelize = require('sequelize')

module.exports = class Storage extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      // 일련번호, PK, 100000 이상의 값 자동 부여 >>> 우선은 자동생성되는 id 값으로 대체
      // s_num: {
      //   type: Sequelize.INTEGER(5),
      //   unique: true,
      //   validate: {
      //     min: 10000,
      //   },
      // },
      // ISBN
      isbn: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      // 책 제목
      title: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      // 저자
      author: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      // 책 위치
      location: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      // 책 가격
      price: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      // 책 사진
      image: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
          isUrl: true
        }
      },
      //  리뷰
      review: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
    }, {
      sequelize,
      tableName: 'storage', // table명을 수동으로 생성 함
      freezeTableName: true, // true: table명의 복수형 변환을 막음
      underscored: true, // true: underscored, false: camelCase
      timestamps: true, // createAt, updatedAt
      paranoid: true, // deletedAt
      charset: 'utf8mb4', 
      collate: 'utf8mb4_general_ci', // 한글 및 이모티콘 입력 허용
    })
  }
 // static associate(db) {
    // db.Storage.belongsToMany(db.Hashtag, { through: 'StorageHashtag' })
  // }
}