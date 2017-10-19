var mongodb = require('mongodb');
var dbServer = new mongodb.Server('localhost', 27017);
var db = new mongodb.Db('market', dbServer);

module.exports = {
	insert: function(_collection, _data, _callback){
		db.open(function(error, db){
			if(error){
				_callback({status: false, message: error});
			} else {
				db.collection(_collection, function(error, collection){
					if(error){
						_callback({status: false, message: error});
					} else {
						collection.insert(_data);
						_callback({status: true});
					}
					db.close();
				})
			}
		})
	},
	select: function(_collection, _condition, _callback){
		db.open(function(error, db){
			if(error){
				_callback({status: false, message: error});
			} else {
				db.collection(_collection, function(error, collection){
					if(error){
						_callback({status: false, message: error});
					} else {
						collection.find(_condition || {}).toArray(function(error, dataset){
							if(error){
								_callback({status: false, message: error});
							} else {
								_callback({status: true, data: dataset});
							}
						})
					}
					db.close();
				})
			}
		})
	},
	
	
	//分页查询所有信息
	select_page: function(_collection, _condition,_data, _callback){
		var pageNo =Number(_data.pageNo);
		var qty=Number(_data.qty);
		var pageLen;
		db.open(function(error, db){
			if(error){
				_callback({status: false, message: error});
			} else {
				db.collection(_collection, function(error, collection){
					if(error){
						_callback({status: false, message: error});
					} else {
						
						collection.find().toArray(function(error, dataset){
							pageLen=Math.ceil(dataset.length/qty);
							
						})
						pageNo=pageNo-1;
						collection.find(_condition || {}).skip(pageNo*qty).limit(qty).toArray(function(error, dataset){
							if(error){
								_callback({status: false, message: error});
							} else {
								_callback({status: true, data: dataset,pageLen:pageLen});
							}
					
						})
						
					}
					db.close();
				})
			}
		})
	},
	//条件分页查询所有信息
	select_page2: function(_collection, _condition,_data, _callback){
		var pageNo =Number(_data.pageNo);
		var qty=Number(_data.qty);
		var pageLen;
		console.log(_collection);
		
		db.open(function(error, db){
			if(error){
				_callback({status: false, message: error});
			} else {
				db.collection(_collection, function(error, collection){
					if(error){
						_callback({status: false, message: error});
					} else {
						
						collection.find(_condition).toArray(function(error, dataset){
							pageLen=Math.ceil(dataset.length/qty);
							
						})
						pageNo=pageNo-1;
						collection.find(_condition || {}).skip(pageNo*qty).limit(qty).toArray(function(error, dataset){
							if(error){
								_callback({status: false, message: error});
							} else {
//								console.log(dataset);
								_callback({status: true, data: dataset,pageLen:pageLen});
							}
					
						})
						
					}
					db.close();
				})
			}
		})
	},

	//更新数据
	update: function(_collection, _condition, _callback){
		db.open(function(error, db){
			if(error){
				_callback({status: false, message: error});
			} else {
				db.collection(_collection, function(error, collection){
					if(error){
						console.log(error);
						_callback({status: false, message: error});
					}else {
						//接收传过来的数组，第一个对象是条件，第二个是更改的数据
						var _condition2=_condition;
						collection.update(_condition2[0],_condition2[1]);
						_callback({status: true});
						}
					})
					
				}
			db.close();
		})
	},
	//删除
	delete: function(_collection, _condition, _callback){
		db.open(function(error, db){
			if(error){
				_callback({status: false, message: error});
			} else {
				db.collection(_collection, function(error, collection){
					if(error){
						console.log(error);
						_callback({status: false, message: error});
					}else {
						collection.remove(_condition);
						_callback({status: true});
						}
					})
					
				}
			db.close();
		})
	}
}
