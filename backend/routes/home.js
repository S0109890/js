const express = require('express');

const router = express.Router();
const logger = require('../lib/logger');
const storageService = require('../service/storageService');

// 리스트 조회
router.get('/', async (req, res) => {
  try {
    const params = {
      title: req.query.title,
      author: req.query.author,
      image: req.query.image,
      discription: req.query.discription,
    };
    logger.info(`(storage.list.params) ${JSON.stringify(params)}`);

    const result = await storageService.list(params);
    logger.info(`(storage.list.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 검색 결과 - 리스트 조회
router.get('/:req', async (req, res) => {
  try {
    const params = { req }
    logger.info(`(storage.list.params) ${JSON.stringify(params)}`)

    const result = await storageService.list(params);
    logger.info(`(storage.list.result) ${JSON.stringify(result)}`)

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});


module.exports = router;