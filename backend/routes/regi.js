const express = require('express');

const router = express.Router();
const logger = require('../lib/logger');
const storageService = require('../service/storageService');

// 등록
router.post('/', async (req, res) => {
  try {
    const params = {
      isbn: req.body.isbn,
      image: req.body.image,
      review: req.body.review,
    };
    logger.info(`(storage.reg.params) ${JSON.stringify(params)}`);

    // 입력값 null 체크
    if (!params.isbn) {
      const err = new Error('Not allowed null (name)');
      logger.error(err.toString());

      res.status(500).json({ err: err.toString() });
    }

    // 비즈니스 로직 호출
    const result = await storageService.reg(params);
    logger.info(`(storage.reg.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
})

// 수정

module.exports = router
