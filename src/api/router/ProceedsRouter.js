var bodyparser = require("body-parser");
var db = require("../DBHelper.js");

module.exports = {
    SY: function(app){
        // 接收json请求
        app.use(bodyparser.json());
        // 解析utf-8
        app.use(bodyparser.urlencoded({ extended: false }));
        // post请求
        app.post("/sy", function(request, response){
            var data = request.body;
                    console.log(data)
            db.select("lins", data, function(result){
                    if(result.data.length>0){
                        response.send(result.data[0]);
                    }else{
                        response.send(false);

                    }
                });
        });
    },
    Voucher: function(app){
        // 接收json请求
        app.use(bodyparser.json());
        // 解析utf-8
        app.use(bodyparser.urlencoded({ extended: false }));
        // post请求
        // app.post("/product", function(request, response){
        //     var data = request.body;
        //     db.select("product", data, function(result){
        //             console.log(result)
        //             response.send(result);
        //         });
        // });
    },
    Money: function(app){
        // 接收json请求
        app.use(bodyparser.json());
        // 解析utf-8
        app.use(bodyparser.urlencoded({ extended: false }));
        // post请求
        // app.post("/product", function(request, response){
        //     var data = request.body;
        //     db.select("product", data, function(result){
        //             console.log(result)
        //             response.send(result);
        //         });
        // });
    }
}