var mongodb = require('mongodb');
var dbServer = new mongodb.Server('localhost', 27017);
var db = new mongodb.Db('csx', dbServer);
var apiResult = require('./ApiResult.js');


var obj = {
	insert: function(_collection, _data, _callback){
		// console.log(_data)
		db.open(function(error, db){
			if(error){
				_callback(apiResult(false, null, error));
				return false;
			}
			db.collection(_collection, function(error, collection){

				if(error){
					_callback(apiResult(false, null, error));
					
					// _callback(9876);
					return false;
				}
				// console.log(_data)
				collection.insert(_data);
				_callback(apiResult(true,null,null));
				db.close();
			})
		})
	},
	find: function(_collection, _data, _callback){
		db.open(function(error, db){
			if(error){
				_callback(apiResult(false, null, error));
				return false;
			}
			db.collection(_collection, function(error, collection){

				if(error){
					_callback(apiResult(false, null, error));
					
					// _callback(9876);
					return false;
				}
				collection.find(_data).toArray( function(err, result) {
					if(err){
						console.log('Error:'+ err);
						return;
					}
				    if(result.length>0){
					    _callback(result);
				    }else{
				    	_callback(false);
				    }
				});
				    db.close();
				
			})
		})
	},
	delete: function(_collection, _data, _callback){},
	update: function(_collection, _data, _callback){}
}

module.exports = obj;