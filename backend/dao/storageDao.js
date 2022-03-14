const { Op } = require('sequelize');
const { Storage } = require('../models/index');

// Storage.bulkCreate([
//       {id: "1", isbn: "1165212308 9791165212308", title: "Node.js 교과서 (기본기에 충실한 노드제이에스 14 입문서)", author: "조현영",},
//       {id: "2",isbn: "1165921170 9791165921170", title: "Node.js 프로젝트 투입 일주일 전 (Node.js의 다양한 모듈을 활용한 웹 서버 개발 실전 노하우 저자 고승원)", author: "고승원",},
//       {id: "3",isbn: "1162244224 9791162244227", title: "한 권으로 끝내는 Node & Express (모던 웹을 위한 서버 사이드 자바스크립트의 모든 것)", "author": "이선 브라운",},
// ], { returning: true }) // will return all columns for each row inserted
// .then((result) => {
//   console.log(result);
// });

const dao = {
  // 등록
  insert(params) {
    return new Promise((resolve, reject) => {
      Storage.create(params).then((inserted) => {
        resolve(inserted);
      }).catch((err) => {
        reject(err);
      });
    });
  },

  // 리스트 조회
  selectList(params) {
    // where 검색 조건 - title
    const setQuery = {};
    if (params.title) {
      setQuery.where = {
        ...setQuery.where,
        title: { [Op.like]: `%${params.title}%` }, // like검색
      };
    }
    // where 검색 조건 - author
    if (params.author) {
      setQuery.where = {
        ...setQuery.where,
        author: { [Op.like]: `%${params.author}%` }, // like검색
      };
    }

    // order by 정렬 조건
    setQuery.order = [['id', 'DESC']];
    return new Promise((resolve, reject) => {
      Storage.findAndCountAll({
        ...setQuery,
      }).then((selectedList) => {
        resolve(selectedList);
      }).catch((err) => {
        reject(err);
      });
    });
  },

  // 상세정보 보기, 해당 서적의 리뷰 보기
  selectInfo(params) {
    return new Promise((resolve, reject) => {
      Storage.findByPk(
        params.id,
      ).then((selectedInfo) => {
        resolve(selectedInfo) // 리뷰만 보내기 (정렬x)
      }).catch((err) => {
        reject(err)
      })
    })
  },

  // 수정
  update(params) {
    return new Promise((resolve, reject) => {
      Storage.update(
        params,
        {
          where: { id: params.id },
        },
      ).then(([updated]) => {
        resolve({ updatedCount: updated })
      }).catch((err) => {
        reject(err)
      })
    })
  },
  
  // 삭제
  delete(params) {
    return new Promise((resolve, reject) => {
      Storage.destroy({
        where: { params },
      }).then((deleted) => {
        resolve({ deletedCount: deleted })
      }).catch((err) => {
        reject(err)
      })
    })
  },
}

module.exports = dao
