var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('hello Express!');
    //res.render('default.hbs', {data: new Date(), name:'Tom'});
    //res.render方法将数据渲染到模板，并将得到的HTML返回给客户端
});

module.exports = router;
