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

// 상세정보 조회
router.get('/:id', async (req, res) => {
  try {
    const params = { id: req.params.id, }
    logger.info(`(storage.info.params) ${JSON.stringify(params)}`);
    
    const result_1 = await storageService.info(params);
    logger.info(`(storage.info.result) ${JSON.stringify(result_1)}`);  
    //result_1 = [object SequelizeInstance:Storage]   

    // 네이버 상세정보 조회
    const result_2 = await storageService.more_info(result_1);
    logger.info(`(storage.more_info.result) ${result_2}`);
    const result = { ...result_1, result_2}
    // console.log(`result = ${ result }`)
    // 최종 응답
    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
})


module.exports = router;