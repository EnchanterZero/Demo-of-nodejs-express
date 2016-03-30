var router = require('express').Router();

router.route('/register')
    .get(function (req, res) {
        res.render('account/register', {title: '注册'});
    })
    .post(function (req, res, next) {
        var username = req.body.username || '',
            password = req.body.password || '';

        if(username.length === 0 || password.length === 0){
            return res.status(400).end('用户名或密码不合法');
        }

        // 将来会在这里检查用户名是否存在，我们先把它设为true
        var usernameExist = true;

        if(usernameExist){
            return res.status(400).end('用户名已存在');
        }

        // 将来会在这里执行用户、密码的存储

        res.status(201).end('注册成功');
    });

module.exports = router;
