var db = require('./DBHelper.js');
var apiResult = require('./ApiResult.js');

// 路由映射表
var router = {
	"/register": function(_data, _callback){
		// 判断用户名是否存在
		var a = JSON.parse(JSON.stringify(_data)).username
		// var b = JSON.parse(JSON.stringify(_data)).password
		a= {"username":a}
		// console.log(a)
		db.find("user", a, function(result){
			var pand = result;
			if(pand == true){

				db.insert("user", _data, function(result){
					_callback(result);
					//{status: true, data: [], message}
					// return;
				});

			}else{

				_callback(apiResult(false, null, '该用户名已被注册'));
			}
			// _callback(result);

		})
		// db.insert("user", _data, function(result){

		// 	_callback(result);
		// 	//{status: true, data: [], message}
		// });
		//connect db
		//register
		//return result
	},
	"/login": function(_data, _callback){
		var a = JSON.parse(JSON.stringify(_data)).username ;
		var b = JSON.parse(JSON.stringify(_data)).password ;
		a= {"username":a,"password":b}
		db.find("use", a, function(result){
			var pand = result;
			// console.log(a)
			if(pand == false){
				_callback(apiResult(false, null, '用户名或密码输入有误'));
			}else{
				console.log(pand)
				_callback(apiResult(true, null,'恭喜你登录成功', pand));
			}
		})
	},
	"/sy": function(_data, _callback){
		
		db.find("test", _data, function(result){
			
			var pand = result
			if(pand == false){
				
				console.log("sy - user.js");
				_callback(JSON.stringify(pand));
			}else{
				console.log(pand)
				_callback(JSON.stringify(pand));
			}
		})
	},

	"/att": {
		GET:function(){},
		POST:function(){}
	}
}

module.exports = router;

// module.exports = {
// 	Register: function(_pathname, _data, _callback){
// 		// /register
// 		if(router[_pathname]){
// 			router[_pathname](_data, function(result){
// 				_callback(result);
// 			});
// 		}
// 	}
// };