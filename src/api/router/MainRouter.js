// 用户
var userRouter = require("./UserRouter.js");
// 产品
var purchaseRouter = require('./PurchaseRouter.js');
// 上架
var productRouter = require("./ProductRouter.js");
// 收银
var proceedsRouter = require("./ProceedsRouter.js");
// 会员
var memberRouter = require("./MemberRouter.js");

module.exports = {
    Register: function(app){
        // //跨域
        app.all('*', function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
            res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
            res.header("X-Powered-By",' 3.2.1');
            if(req.method=="OPTIONS") {
              res.send(200);/*让options请求快速返回*/
            } else{
              next();
            }
        });

        // 用户管理
        userRouter.Register(app);
        // 收银管理
        // proceedsRouter.
        // 产品管理
        // 采购管理

    }
}