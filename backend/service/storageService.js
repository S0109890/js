const logger = require('../lib/logger');
const storageDao = require('../dao/storageDao');

const service = {
  // storage 입력
  async reg(params) {
    let inserted = null;

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