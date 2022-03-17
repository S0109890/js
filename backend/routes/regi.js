const express = require('express')

const router = express.Router()
const logger = require('../lib/logger')
const storageService = require('../service/storageService')

// 등록
router.post('/', async (req, res) => {
  try {
    const params = {
      isbn: req.body.isbn,
      price: req.body.price,
      location: req.body.location,
      review: req.body.review
    }
  
    // 입력값 null 체크
    if (!params.isbn) {
      const err = new Error('Not allowed null (name)')
      logger.error(err.toString())
      res.status(500).json({ err: err.toString() })
    }
    
    // 네이버 상세정보 조회
    const result_2 = await storageService.more_info(params.isbn)
    logger.info(`(storage.more_info.result) ${result_2}`)
    
    const params_list = { ...params, result_2 }
    const total_params = {
      isbn: params_list.isbn,
      review: params_list.review,
      price: params_list.price,
      location: params_list.location,
      title: params_list.result_2[0].title,
      author: params_list.result_2[0].author,
      publisher: params_list.result_2[0].publisher,
      image: params_list.result_2[0].image,
      link: params_list.result_2[0].link,
    }
    logger.info(`(storage.reg.params) ${JSON.stringify(total_params)}`)

    // 비즈니스 로직 호출
    const result = await storageService.reg(total_params)
    logger.info(`(storage.reg.result) ${JSON.stringify(result)}`)

    // 최종 응답
    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ err: err.toString() })
  }
})



// 수정
router.put('/:id', async (req, res) => {
  try {
    const params = {
      id: req.params.id,
      location: req.body.location,
      price: req.body.price,
    }
    logger.info(`(storage.edit.params) ${JSON.stringify(params)}`)

    // 비즈니스 로직 호출
    const result = await storageService.edit(params)
    logger.info(`(storage.edit.result) ${JSON.stringify(result)}`)

    // 최종 응답
    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ err: err.toString() })
  }
})

module.exports = router
