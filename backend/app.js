const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const corsConfig = require('./config/corsConfig.json');
const models = require('./models');
const logger = require('./lib/logger');
const bodyParser = require('body-parser');

dotenv.config();

const NODE_ENV = process.env.NODE_ENV;

const indexRouter = require('./routes/index');

const app = express();
// const client_id = 'qkgbpYoWMqnsIJh0Dcux';
// const client_secret = 'KyABGi7_GI';

logger.info('app start');


// view engine setup
// views -> 사용하는 템플릿 엔진 이 있는 디렉토리 설정 
app.set('views', path.join(__dirname, 'views'));
// 뷰 엔진 설정 - express에서 사용할 템플릿 엔진을 설정합니다. ejs로 생성했기 때문에 ejs 지정
app.set('view engine', 'ejs');

app.use(cors(corsConfig)); // 해당 파일에 적힌 내용에 대해 교차통신 허용
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 라우터 연결
app.use('/', indexRouter);

// mqtt subscribe
// receiveMqtt();

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// DB 연결 확인
models.sequelize.authenticate().then(() => {
  logger.info('DB connection success')

    // sequelize sync (table 생성)
    models.sequelize.sync().then(() => {
      logger.info('Sequelize sync success');
    }).catch((err) => {
      logger.error('Sequelize sync error', err);
    });
  }).catch((err) => {
    logger.error('DB Connection fail', err);
});

module.exports = app;