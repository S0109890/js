const express = require('express');

const router = express.Router();
const logger = require('../lib/logger');
const storageService = require('../service/storageService');


// 서비스를 라우터에 등록
// 등록
router.post('/', async (req, res) => {
  try {
    const params = {
      isbn: req.body.isbn,
      title: req.body.title,
      author: req.body.author,
      publisher: req.body.publisher,
      // image: req.body.image,
      review: req.body.review,
      link: req.body.link,
      location: req.body.location,
      price: req.body.price,
      createdAt: req.body.createdAt
    };
    logger.info(`(storage.reg.params) ${JSON.stringify(params)}`);
    
    // 입력값 null 체크
    if (!params.title || !params.author ) {
      const err = new Error('Not allowed null (name, userid, password)');
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
});

// 리스트 조회
router.get('/', async (req, res) => {
  try {
    const params = { 
      title: req.query.title,
      author: req.query.author, 
     };
    logger.info(`(storage.list.params) ${JSON.stringify(params)}`);
    
    const result = await storageService.list(params);
    console.log("###리스트불러오기",result);

    logger.info(`(storage.list.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
})


//검색기능 상세정보 조회
router.get('/:title', async (req, res) => {
  try {
    const params = { 
      title: req.params.title,
      author: req.params.author, 
    }
    console.log('여보세요:params?',params)
    logger.info(`(storage.search.params) ${JSON.stringify(params)}`);

    const result = await storageService.search(params)
    console.log("req 값이 포함된 제목 검색",result);
    logger.info(`(storage.search.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
})


module.exports = router;