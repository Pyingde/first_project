var bodyparser = require("body-parser");
var db = require("../DBHelper.js");
// var urlencode = bodyparser.urlencoded({extended: false});

module.exports = {
    Register: function(app){
<<<<<<< HEAD

=======
>>>>>>> 57b57b639023f49977418e017551c5234dd302c4
        // 接收json请求
        app.use(bodyparser.json());
        // 解析utf-8
        app.use(bodyparser.urlencoded({ extended: false }));
        // post请求
        app.post("/login", function(request, response){
<<<<<<< HEAD
            console.log(request.body)
            console.log(request.body.password)
            db.select("user", {"username":request.body.name,"password":request.body.password}, function(result){
                    console.log(result)
                    response.send(result);
=======
            db.select("user", {"username":request.body.username,"password":request.body.password}, function(result){
                console.log(result)
                    if(result.data.length>0){
                        response.send(true);
                    }else{
                        response.send(false);

                    }
>>>>>>> 57b57b639023f49977418e017551c5234dd302c4
                });
        });
    }

}