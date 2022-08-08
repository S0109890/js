const logger = require('../lib/logger');
// const storageDao = require('../dao/storageDao');
// const axios = require('axios');
const { eventNames } = require('../app');


const service = {
  // // 등록할 책 정보 입력
  // async reg(params) {
  //   let inserted = null;
  //   // 비어있다면 params 들어올 때 까지 기다리기
  //   try {
  //     inserted = await storageDao.insert(params);
  //     logger.debug(`(storageService.reg) ${JSON.stringify(inserted)}`);
  //   } catch (err) {
  //     logger.error(`(storageService.reg) ${err.toString()}`);
  //     return new Promise((resolve, reject) => {
  //       reject(err);
  //     });
  //   }
  //   // 결과값 리턴
  //   return new Promise((resolve) => {
  //     resolve(inserted);
  //   });
  // },
  
  //mqqtt값 프론트에 전달한다.

};

module.exports = service;