var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
//用以解析cookie的模块
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('hbs')

var routes = require('./routes/index');
var users = require('./routes/users');
var hello = require('./routes/hello');
var account = require('./routes/account');

var app = express();
//////////////////////////////////////////////////////////////////////////////////////////////////
console.log('__dirname:'+ __dirname);
console.log('__filename:'+ __filename);


//var MongoClient = require('mongodb').MongoClient
//    , assert = require('assert');
//
//// Connection URL
//var url = 'mongodb://15126225:184833@42.96.159.58:27017/blog';
//// Use connect method to connect to the Server
//MongoClient.connect(url, function(err, db) {
//    assert.equal(null, err);
//    console.log("Connected correctly to server");
//
//    db.close();
//});
var mongoose = require('mongoose');
var url = 'mongodb://15126225:184833@42.96.159.58:27017/blog';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log('连接成功');
    var Cat = mongoose.model('Cat', { name: String });

    var kitty = new Cat({ name: 'aaaaa' });
    kitty.save(function (err) {
        if (err) {console.error('meow');}
        else{console.log('meow');}
    });
});

var passport = require('passport'),
    User = require('./models/user');

passport.use(User.createStrategy());
//这里为用户验证指定了使用用户名与密码进行验证（Basic）的验证策略。当然，passport-local-mongoose还提供了其他的验证策略如：OAuth、Digest、Anonymous等。
var cookieParser = require('cookie-parser');
var session = require('express-session');
app.use(cookieParser());
app.use(session({secret: 'hello! TMY', resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());//
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//Express中间件的顺序很重要。需要在引入cookie之后再引入session，再引入passport。因为session需要cookie，而passport需要session。

//启用cookie这个中间件
app.use(cookieParser());
//////////////////////////////////////////////////////////////////////////////////////////////////
// view engine setup
app.set('view engine', 'hbs');
//'views'指定了模板文件的搜索路径,app.set('views', __dirname + '/views');注：字符串拼接时，join效率要比+好
app.set('views', path.join(__dirname, 'views'));
//指定模板片段所在的搜索路径
hbs.registerPartials(__dirname + '/views/partials');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/hello', hello);
app.use('/account', account);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);//状态码500(服务器内部错误)
    res.render('error', {
      message: err.message,
      error: err //生产环境中应设为‘error:{}’,禁止输出错误
    });
  });
}

// production error handler
// no stacktraces leaked to user

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
      http_status:500,
      message: err.message,
      error: {}
  });
});


module.exports = app;
