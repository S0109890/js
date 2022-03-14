const express = require('express');
const request = require('request');

const router = express.Router();
const logger = require('../lib/logger');
const storageService = require('../service/storageService');

// 상세정보 조회 - 리뷰만 반환 받음
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

  try {
    const client_id = 'qkgbpYoWMqnsIJh0Dcux'
    const client_secret = 'KyABGi7_GI'
    const api_url = 'https://openapi.naver.com/v1/search/book?query=' + encodeURIComponent(encodeURIComponent(res.params.title)) // json 결과
    const options = {
        url: api_url,
        headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
     };
    request.get(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
        res.end(body);
      } else {
        res.status(response.statusCode).end();
        console.log('error = ' + response.statusCode);
      }
    })
  } catch (err) { 
    res.status(500).json({ err: err.toString() })
    console.error("Naver API 통신 에러 발생")
  }
})

// 리뷰 수정 


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

