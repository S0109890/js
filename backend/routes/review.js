const express = require('express');
const request = require('request');
const axios = require('axios')
const dotenv = require('dotenv');
const { query } = require('../lib/logger');

dotenv.config()

const router = express.Router();
const logger = require('../lib/logger');
const storageService = require('../service/storageService');
const { response } = require('express');

const client_id = 'qkgbpYoWMqnsIJh0Dcux'
const client_secret = 'KyABGi7_GI'


// 상세정보 조회
router.get('/:id', async (req, res) => {
  try {
    const params = { id: req.params.id, }
    logger.info(`(storage.info.params) ${JSON.stringify(params)}`);
    
    const result = await storageService.info(params);
    logger.info(`(storage.info.result) ${JSON.stringify(result)}`);
    // 최종 응답
    res.status(200).json(result)

    console.log(result.isbn)
    console.log(result)

    // 네이버 상세정보 조회
    const naver_res = await axios.get('https://openapi.naver.com/v1/search/book.json',{
      headers: {
        'X-Naver-Client-Id' : client_id, 
        'X-Naver-Client-Secret' : client_secret,
      }, 
      params: {
        query : result.isbn
      }
    })
    .then(response => { return JSON.stringify(response.data.items) })
    .catch(err => { console.log(err) })
    console.log(naver_ress)
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
})

// 리뷰 수정 
router.put('/:id', async (req, res) => {
  try {
    const params = {
      id: req.params.id,
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
router.put('/:id', async (req, res) => {
  try {
    const params = {
      id: req.params.id,
      review: req.body.review
    }
    logger.info(`(storage.reviewDelete.params) ${JSON.stringify(params)}`);

    // 비즈니스 로직 호출
    const result = await storageService.edit(params);
    logger.info(`(storage.reviewDelete.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
})

// 도서 삭제
router.delete('/:id', async (req, res) => {
  try {
    const params = {
      id: req.params.id
    }
    logger.info(`(storage.delete.params) ${JSON.stringify(params)}`)

    // 비즈니스 로직 호출
    const result = await storageService.delete(params);
    logger.info(`(storage.delete.result) ${JSON.stringify(result)}`)

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
})

module.exports = router

