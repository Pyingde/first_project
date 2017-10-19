var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var db;
//var url = "mongodb://10.3.131.32:27017/market";
MongoClient.connect("mongodb://localhost:27017/market", function(err, database) {
  if(err) throw err;
  
  db = database;
});

module.exports = {
    insert: function(_collection, _data, _callback){
        var i = db.collection(_collection).insert(_data).then(function(result){
            _callback({status: true});
        });
    },
    select: function(_collection, _condition, _callback){
        var i = db.collection(_collection).find(_condition || {}).toArray(function(error, dataset){
            _callback({status: true, data: dataset});
        })
    },
    update: function(_collection, _condition, _callback){
        var i = db.collection(_collection).update(_condition[0],_condition[1]).then(function(result){
            _callback({status: true});
        });
    },
    delete: function(_collection, _condition, _callback){
        var i = db.collection(_collection).remove(_condition).then(function(result){
            _callback({status: true});
        });
    
    },
    
        //分页查询所有信息
    select_page: function(_collection, _condition,_data, _callback){
        var pageNo =Number(_data.pageNo);
        var qty=Number(_data.qty);
        var pageLen;
        var i = db.collection(_collection).find().toArray(function(error, dataset){
            pageLen=Math.ceil(dataset.length/qty);                                      
        })
        pageNo=pageNo-1;
        var j = db.collection(_collection).find(_condition).skip(pageNo*qty).limit(qty).toArray(function(error, dataset){                           
                    _callback({status: true, data: dataset,pageLen:pageLen});       
        })
            
    },
    //条件分页查询所有信息
    select_page2: function(_collection, _condition,_data, _callback){
        var pageNo =Number(_data.pageNo);
        var qty=Number(_data.qty);
        var pageLen;    
        var i = db.collection(_collection).find(_condition).toArray(function(error, dataset){
            pageLen=Math.ceil(dataset.length/qty);                          
            pageNo=pageNo-1;
            var j= db.collection(_collection).find(_condition).skip(pageNo*qty).limit(qty).toArray(function(error, dataset){                            
                    _callback({status: true, data: dataset,pageLen:pageLen});
        
            })
        })
        
    }
}