var bodyparser = require("body-parser");
var db = require("../DBHelper.js");
// var urlencode = bodyparser.urlencoded({extended: false});

module.exports = {
    Register: function(app){

        // 接收json请求
        app.use(bodyparser.json());
        // 解析utf-8
        app.use(bodyparser.urlencoded({ extended: false }));
        // post请求
        app.post("/login", function(request, response){
            db.select("user", {"username":request.body.username,"password":request.body.password}, function(result){
                console.log(result)
                    if(result.data.length>0){
                        response.send(true);
                    }else{
                        response.send(false);

                    }
                });
        });
    }

}