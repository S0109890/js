const express = require('express');

const router = express.Router();
const logger = require('../lib/logger');
const storageService = require('../service/storageService');

// 리스트 조회
router.get('/', async (req, res) => {
  try {
    const params = {
      name: req.query.name,
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

// 상세정보 조회
router.get('/:id', async (req, res) => {
  try {
    const params = {
      id: req.params.id,
    };
    logger.info(`(storage.info.params) ${JSON.stringify(params)}`);

    const result = await storageService.info(params);
    logger.info(`(storage.info.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});


module.exports = router;