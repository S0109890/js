const express = require('express');
const logger = require('../lib/logger');
const homeRouter = require('./home');
// const reviewRouter = require('./review');
// const regiRouter = require('./regi');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

// logTest
router.get('/log-test', (req, res, next) => {
  logger.error('This message is error');
  logger.warn('This message is warn');
  logger.info('This message is info');
  logger.verbose('This message is verbose');
  logger.debug('This message is debug');
  logger.silly('This message is silly');

  res.send('log test');
});

// RESTFull API
router.use('/home', homeRouter);
// router.use('/review', reviewRouter);
// router.use('/regi', regiRouter);


module.exports = router;
