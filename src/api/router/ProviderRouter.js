var db = require('../DBHelper.js');
//var db = require('../DB.js');
var bodyparser = require('body-parser');
var urlencode = bodyparser.urlencoded({extended: false});


module.exports = {
	Register: function(app){
		app.post("/addProvider", urlencode, function(request, response){			
			db.select("provider", {name: request.body.name}, function(result){
				if(!result.status){
					response.send(result);
				} else if(result.data.length > 0) {
					response.send({status: false, message: "当前供应商已存在"});
				} else {
					db.insert("provider", request.body, function(result){
						response.send(result);
					})
				}
			})
		});

		app.post("/selectProvider",urlencode, function(request, response){
			
			//分页查询所有供应商
			db.select_page("provider", {},request.body,function(result){
				if(!result.status){
					response.send(result);
				} else if(result.data.length > 0) {
					response.send({status: true, message: result.data,pageLen:result.pageLen});
				}
			})
		});
		//查找数据selectMsg
		app.post("/selectMsg",urlencode, function(request, response){
			//分页查询所有供应商
			
			
			db.select_page2("provider", {
				$or:[
				{provider_num:request.body.input_msg},
				{name:request.body.input_msg},
				{adress:request.body.input_msg},
				{tel:request.body.input_msg},
				{fax:request.body.input_msg},
				{remark:request.body.input_msg},
				]},request.body,function(result){
				if(!result.status){
					response.send(result);
				} else if(result.data.length > 0) {
					
					response.send({status: true, message: result.data,pageLen:result.pageLen});
				}
			})
		});
		
		app.post("/delProvider",urlencode, function(request, response){
			
			//删除供应商
			db.delete("provider", {name: request.body.name},function(result){
				if(!result.status){
					response.send(result);
				} else{
					response.send(result);
				}
			})
		});
		//更新供应商信息 
		app.post("/updataProvider", urlencode, function(request, response){		
//			console.log(request.body.provider_name);
			db.update("provider", [{name: request.body.provider_name},{
				provider_num:request.body.provider_num,
				name:request.body.name,
				adress:request.body.adress,
				tel:request.body.tel,
				fax:request.body.fax,
				remark:request.body.remark
			}],
			function(result){
				if(!result.status){
					response.send(result);
				} else{
					response.send(result);
				}
			})
		});
	
	}
}