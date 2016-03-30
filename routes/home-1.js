/**
 * Created by harttle on 15/4/14.
 */


var router = require('express').Router();

var user = {
    id: 1,
    username: 'alice',
    title: 'alice 的博客',
    description: 'Alice是个好人`',
    avatar: '/images/default-avatar.jpeg'
};


router.get('/', function(req, res, next) {
    res.render('home/index', {
        users: [user, user, user],
        title: 'TMY BLOG: 一个简单的博客系统'
    });
});

module.exports = router;
