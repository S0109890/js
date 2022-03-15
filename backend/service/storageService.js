const logger = require('../lib/logger');
const storageDao = require('../dao/storageDao');
const axios = require('axios')


const service = {
  // 등록할 책 정보 입력
  async reg(params) {
    let inserted = null;
    // 비어있다면 params 들어올 때 까지 기다리기
    try {
      inserted = await storageDao.insert(params);
      logger.debug(`(storageService.reg) ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`(storageService.reg) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }
    // 결과값 리턴
    return new Promise((resolve) => {
      resolve(inserted);
    });
  },

  // selectList
  async list(params) {
    let result = null;
    try {
      result = await storageDao.selectList(params);
      logger.debug(`(storageService.list) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(storageService.list) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }
    return new Promise((resolve) => {
      resolve(result);
    });
  },

  // selectInfo
  async info(params) {
    let result = null;
    try {
      result = await storageDao.selectInfo(params);
      logger.debug(`(storageService.info) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(storageService.info) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }
    return new Promise((resolve) => {
      resolve(result);
    });
  },

  // NAVER book API search
  async more_info(params) {
    let result = null;
    try {
      result = await axios.get('https://openapi.naver.com/v1/search/book.json',{
      headers: {
        'X-Naver-Client-Id' : 'qkgbpYoWMqnsIJh0Dcux', 
        'X-Naver-Client-Secret' : 'KyABGi7_GI',
      }, 
      params: {
        query : params.isbn
      }
      })
      .then(result => { return result.data.items })
      .catch(err => { console.log(err) })
      logger.debug(`(storageService.more_info) ${result}`);
    } catch (err) {
      logger.error(`(storageService.more_info) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }
    return new Promise((resolve) => {
      resolve(result);
    });
  },

  // update
  async edit(params) {
    let result = null;

    try {
      result = await storageDao.update(params);
      logger.debug(`(storageService.edit) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(storageService.edit) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },
  
  // delete_review
  async delete_review(params) {
    let result = null;

    try {
      result = await storageDao.delete_review(params);
      logger.debug(`(storageService.delete_review) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(storageService.delete_review) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }
    return new Promise((resolve) => {
      resolve(result);
    });
  },

  // delelte
  async delete(params) {
    let result = null;

    try {
      result = await storageDao.delete(params);
      logger.debug(`(storageService.delete) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(storageService.delete) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },
};

module.exports = service;