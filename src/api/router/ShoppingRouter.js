//var db = require('../DBHelper.js');
var db = require('../DB.js');
var bodyparser = require('body-parser');
var urlencode = bodyparser.urlencoded({extended: false});


module.exports = {
	Goodlist: function(app){
		app.post("/addGood", urlencode, function(request, response){			
			db.select("goods", {goods_name: request.body.goods_name}, function(result){
				if(!result.status){
					response.send(result);
				} else if(result.data.length > 0) {
//					response.send({status: false, message: "当前商品已存在，已自动叠加商品数量"});
//					console.log(result.data[0].goods_name);
					db.update("goods", [{goods_name: result.data[0].goods_name},{	
						goods_number:request.body.goods_number,
						goods_name:request.body.goods_name,
						goods_type:request.body.goods_type,
						goods_num:request.body.goods_num*1 + result.data[0].goods_num*1,
						monad:request.body.monad,
						only_price:request.body.only_price,
						buyer:request.body.buyer,
						provider:request.body.provider
					}],
					function(result){
						if(!result.status){
							response.send(result);
						} else{
							
							response.send({status:false  , message: "当前商品已存在，已自动叠加商品数量"});
						}
					})		
				} else {
					db.insert("goods", request.body, function(result){
						response.send(result);
					})
				}
			})
		});
		app.post("/selectGood",urlencode, function(request, response){
			//分页查询所有商品
			db.select_page("goods", {},request.body,function(result){
				if(!result.status){
					response.send(result);
				} else if(result.data.length > 0) {
					response.send({status: true, message: result.data,pageLen:result.pageLen});
				}
			})
		});
//		//查找数据selectMsg
		app.post("/selectMsg2",urlencode, function(request, response){
			//分页查询所有商品		
			db.select_page2("goods", {
				$or:[		    	
				{goods_number:request.body.input_msg},
				{goods_name:request.body.input_msg},
				{goods_type:request.body.input_msg},
				{goods_num:request.body.input_msg},
				{monad:request.body.input_msg},
				{only_price:request.body.input_msg},
				{buyer:request.body.input_msg},
				{provider:request.body.input_msg},
				]},request.body,function(result){
				if(!result.status){
					response.send(result);
				} else if(result.data.length > 0) {
					
					response.send({status: true, message: result.data,pageLen:result.pageLen});
				}
			})
		});
		
		app.post("/delGoods",urlencode, function(request, response){
			//删除商品
			db.delete("goods", {goods_name: request.body.goods_name},function(result){
				if(!result.status){
					response.send(result);
				} else{
					response.send(result);
				}
			})
		});
//		//更新商品信息 
		app.post("/updataGoods", urlencode, function(request, response){			
			db.update("goods", [{goods_name: request.body._name},{				
				goods_number:request.body.goods_number,
				goods_name:request.body.goods_name,
				goods_type:request.body.goods_type,
				goods_num:request.body.goods_num,
				monad:request.body.monad,
				only_price:request.body.only_price,
				buyer:request.body.buyer,
				provider:request.body.provider
			}],
			function(result){
				if(!result.status){
					response.send(result);
				} else{
					response.send(result);
				}
			})
		});
		
		//搜索所有商品信息 ，不分页
		app.post("/selectAllgoods", urlencode, function(request, response){			
			db.select("goods", {},function(result){
				if(!result.status){
					response.send(result);
				} else{
					response.send(result);
				}
			})
		});
		
		//循环讲订单所有数据插入仓库的数据库
		app.post("/insertAllgoods", urlencode, function(request, response){
			
//			console.log(JSON.parse(request.body.msg_obj));
			var arr = JSON.parse(request.body.msg_obj)
			var length = arr.length;
			console.log(arr);
			for(var i=0;i<length;i++){
//				db.select("product", {name: arr[i].goods_name}, function(result){
//					if(!result.status){
//						response.send(result);
//					} else if(result.data.length > 0) {
//	//					response.send({status: false, message: "当前商品已存在，已自动叠加商品数量"});
//	//					console.log(result.data[0].goods_name);
//						db.update("product", [{name: result.data[0].goods_name},{	
//							code:arr[i].goods_number,
//							name:arr[i].goods_name,
//							type:arr[i].goods_type,
//							number:arr[i].goods_num*1 + result.data[0].goods_num*1,
//							unit:arr[i].monad,
//							price:arr[i].only_price		
//						}],
//						function(result){
//							if(!result.status){
//								response.send(result);
//							} else{
//	//							response.send({status:true});
//							}
//						})		
//					} else {
//						db.insert("product", arr[i], function(result){
//							response.send({status:true  , message: "商品已入库"});
//						})
//					}
//				})
				
			}

		});
		
	
	}
}