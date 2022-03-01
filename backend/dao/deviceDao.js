const { Device } = require('../models/index');

const dao = {
  insert(params) {
    return new Promise((resolve, reject) => {
      Device.create(params).then((inserted) => {
        resolve(inserted);
      }).catch((err) => {
        reject(err);
      });
    });
  },
};

module.exports = dao;