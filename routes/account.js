var express = require('express');
var passport = require('passport');
var UserModel = require('../models/user');

var router = express.Router();
router.get('/',function(request , response){
    // 如果cookie未被设置过authenticated则重定向
    if(!request.cookies.authenticated) return response.redirect('account/login');

    // 如果已登录，则继续业务逻辑
    return response.send('account page');
});

//登录页面请求处理
router.get('/login',function(request , response){
    return response.render('account/login',{title:'注册'});
});
//在这里我们给router的post方法传递了三个参数，这时后两个参数就成为了级联的中间件。
// 当第一个中间件调用next()时第二个中间件会得到执行。
// 这样，passport在我们的中间件执行之前，进行了用户名密码的验证，如果通过了验证则会调用我们的中间件；否则会返回401（Not Authenticated）响应。
router.post('/login', passport.authenticate('local'), function(req,res,next){
    // 如果进入了该方法，则已经验证成功。
    // 我们可以重定向到首页：
    //res.redirect('/');
    // 可以添加cookie中，设置键authenticated的值为true
    res.cookie('authenticated', true);
    // 或者发送成功的响应：
    res.status(200).end("登录成功");
});
//不采用加密验证工具的时使用的登录代码
//router.post('/login',function(req,res,next){
//    var username = req.body.username || '';
//    var password = req.body.password || '';
//    console.log('Register post received!');
//
//    if(username.length === 0 || password.length === 0){
//        return res.status(400).end('用户名或密码不合法');
//    }
//
//    // 这里检查用户名是否存在
//    UserModel.findOne({username:username},function(err,user)
//    {console.log("checking username:" + username);
//        if(!user || user.password!=password){
//            //当用户名或密码错误时，设置状态码为400（Bad Request），并返回信息用户名或密码不合法。客户端便会调用fail()，用warn()方法将该信息显示在页面上。
//            return res.status(400).end('用户名不存在或密码错误！');
//        }
//        else{// 登录成功
//            return res.status(200).end('登录成功！');
//            //console.log(UserEntity.username);
//        }
//    });
//});


//注册页面请求处理
router.get('/register',function(request , response){

    console.log('Register get received!');

    return response.render('account/register',{title:'注册'});
    //res.render方法将数据渲染到模板，并将得到的HTML返回给客户端
}).post('/register',function(req,res,next){
    var username = req.body.username || '';
    var password = req.body.password || '';
    console.log('Register post received!');

    if(username.length === 0 || password.length === 0){
        return res.status(400).end('用户名或密码不合法');
    }

    // 这里检查用户名是否存在
    UserModel.findOne({username:username},function(err,user)
    {console.log("checking username:" + username);
        if(user){
            //当用户名或密码不合法时，设置状态码为400（Bad Request），并返回信息用户名或密码不合法。客户端便会调用fail()，用warn()方法将该信息显示在页面上。
            return res.status(400).end('用户名已存在');
        }
        else{// 在这里执行用户、密码的存储
            //var UserEntity = new UserModel({username: username, password: password});
            //UserEntity.save();
            //上面是普通的存储，没有加密，并未使用passport等包
            UserModel.register(new UserModel({username:username}), req.body.password,function(err){
                if(err) return nest(err);
                res.status(201).end("注册成功");
            })
            //console.log(UserEntity.username);
        }
    });
});

module.exports = router;