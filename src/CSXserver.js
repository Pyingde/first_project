var http = require('http');
var router = require('./js/login/router.js');

http.createServer(function(request, response){
    router.Register(request, response);
}).listen(999);

// http.createServer(function(request, response){

//     qianduan(request, response);

// }).listen(998);