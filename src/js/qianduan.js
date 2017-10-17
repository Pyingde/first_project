var mongodb = require('mongodb');
var dbServer = new mongodb.Server('localhost', 27017);
var db = new mongodb.Db('csx', dbServer);

// obj('test', data )
module.exports = function(_collection, _data, _callback){
        db.open(function(error, db){
            if(error){
                console.log(1+error);
                return false;
            }
            db.collection(_collection, function(error, collection){

                if(error){
                    console.log(error);
                    
                    // _callback(9876);
                    return false;
                }
                collection.find(_data).toArray( function(err, result) {
                    if(err){
                        console.log('Error:'+ err);
                        return;
                    }
                    // console.log(_data)
                    if(result.length>0){

                        // var result = {"CG":result[0].CG,"CP":result[0].CP,"SY":result[0].SY}
                        console.log(result)
                        // _callback(result);
                    }else{
                        // _callback(false);
                        console.log(789)
                    }
                });
                    db.close();
                
            })
        })
}

