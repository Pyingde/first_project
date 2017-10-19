//var db = require('../DBHelper.js');
var db = require('../DB.js');
var userRouter = require('./UserRouter.js');
var ShoppingRouter = require('./ShoppingRouter.js');
var bodyparser = require('body-parser');
var urlencode = bodyparser.urlencoded({extended: false});
//合并所有路由
var PrimaryRuter = Object.assign({}, userRouter, ShoppingRouter);
module.exports = {
	Register: function(express){
		var app = express();
		//解决跨域
		app.all('*', function(req, res, next) {
//		    res.writeHead(200, {"Content-Type"})
		    res.header("Access-Control-Allow-Origin", "*");
		    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
		    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
		    res.header("X-Powered-By",' 3.2.1')
		    if(req.method=="OPTIONS") {
		      res.send(200);/*让options请求快速返回*/
		    } else{
		      next();
		    }
		});
		//express.static 指当前文档的静态目录
		app.use(express.static(__dirname + '/'));
//		userRouter.Register(app);
		
		
		PrimaryRuter.Register(app, db);
        PrimaryRuter.Register(app, urlencode, db);
        PrimaryRuter.Goodlist(app, urlencode, db);
		app.listen(666);
	}
	
	
}
