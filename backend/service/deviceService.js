const logger = require('../lib/logger');
const deviceDao = require('../dao/deviceDao');

const service = {
  // device 입력
  async reg(params) {
    let inserted = null;

    try {
      inserted = await deviceDao.insert(params);
      logger.debug(`(deviceService.reg) ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`(deviceService.reg) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    // 결과값 리턴
    return new Promise((resolve) => {
      resolve(inserted);
    });
  },
};

module.exports = service;