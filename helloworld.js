var express = require('express');
var favicon = require('serve-favicon');
var app = express();
app.use(favicon(__dirname + '/favicon.ico'));
app.get('/', function(req, res){
    res.send('hello world');
});
app.listen(1337);
console.log('Server running at http://127.0.0.1:1337/');
