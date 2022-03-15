
const express = require('express');
const { query } = require('../lib/logger');

const router = express.Router();
const logger = require('../lib/logger');
const storageService = require('../service/storageService');
const { response } = require('express');
const { DataTypes } = require("sequelize");

const client_id = 'qkgbpYoWMqnsIJh0Dcux'
const client_secret = 'KyABGi7_GI'


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
    // const result_2_json = {...result_2}
    const result_2_pop = result_2.slice(1,546)
    const result = { ...result_1, result_2_pop}
    // const result = result_1.push(result_2)
    console.log(`result = ${ result }`)
    // 최종 응답
    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
})

// 리뷰 수정 
router.put('/', async (req, res) => {
  try {
    const params = {
      isbn: req.body.isbn,
      image: req.body.image,
      review: req.body.review,
    };
    logger.info(`(storage.edit.params) ${JSON.stringify(params)}`);

    // 입력값 null 체크
    if (!params.review) {
      const err = new Error('Not allowed null (name)');
      logger.error(err.toString());

      res.status(500).json({ err: err.toString() });
    }

    // 비즈니스 로직 호출
    const result = await storageService.edit(params);
    logger.info(`(storage.edit.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
})

// 리뷰 삭제
router.delete('/', async (req, res) => {
  try {
    const params = { id: req.body.id }
    logger.info(`(storage.delete.params) ${JSON.stringify(params)}`);

    // 비즈니스 로직 호출
    const result = await storageService.delete(params);
    logger.info(`(storage.delete.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
})

module.exports = router

