var url = require('url');
var qs = require('querystring');
var apiResult = require('./ApiResult.js');

var userRouter = require('./user.js');
var allRouter = Object.assign({},userRouter);

//http://localhost:81/register
module.exports = {
	Register: function(request, response){
        // 跨域
        response.writeHead(200, {
            "Access-Control-Allow-Origin": "*", 
            "Content-type": "text/plain;charset=UTF-8",
            "Access-Control-Allow-Headers": "Content-Type,Content-Length, Authorization, Accept,X-Requested-With",
            "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS",
        });
        var urlString = request.url;
        var urlObj = url.parse(urlString,true);
        var _pathname = urlObj.pathname;
        // /register
        if(!allRouter[_pathname]){
            response.end(apiResult(false,null,'请求地址错误'));
            return false;
        }
        if(_pathname == 'favicon.ico'){
            return false;
        }
        if(request.method === 'POST'){
            // console.log(777)
            var postData = '';
            request.addListener('data',function(a){
                postData+=a;
            })

            request.addListener('end',function(){
                var pos = qs.parse(postData)
                // console.log(pos)
                if(typeof allRouter[_pathname] == "function"){
                    allRouter[_pathname](pos, function(result){
                        console.log(result)
                        response.write(result);
                        response.end();
                    })
                }else{
                    allRouter[_pathname][request.method](pos, function(result){
                        response.write(result);
                        response.end();
                    })
                }
            })
        }else if(request.method === 'GET'){
            if(typeof allRouter[_pathname] == "function"){
                allRouter[_pathname](urlObj.query, function(result){
                    response.write(result);
                    response.end();
                })
            }else{
                if(!allRouter[_pathname][request.method]){
                    response.end(apiResult(false,null,'请求类型有误'));
                }else{
                    allRouter[_pathname][request.method](urlObj.query, function(result){
                        response.write(result);
                        response.end();
                    })
                }
            }
        }
	}
}


