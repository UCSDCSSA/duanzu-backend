var MongoClient = require('mongodb').MongoClient;
var fs = require('fs');
var username = 'admin'
var password = 'DE54mdvb5p9swfi9'
var conn_str = "mongodb://admin:DE54mdvb5p9swfi9@test-shard-00-00-cgxsm.mongodb.net:27017,test-shard-00-01-cgxsm.mongodb.net:27017,test-shard-00-02-cgxsm.mongodb.net:27017/test?ssl=true&replicaSet=test-shard-0&authSource=admin"
MongoClient.connect(conn_str, function(err, db){
  if(err){ 
    console.log("Please check you db connection parameters");
  }else{
    console.log("Connection success");
    var user_file = 'mock_user';
    var leasing_file = 'mock_leasing';
    var complex_file = 'mock_complex';
    var user_list = JSON.parse(fs.readFileSync(user_file).toString('utf-8'));
    var leasing_list = JSON.parse(fs.readFileSync(leasing_file).toString('utf-8'));
    var complex_list = JSON.parse(fs.readFileSync(complex_file).toString('utf-8'));
    db = db.db("cssa")
    console.log("Current database", db.databaseName);

    var collection = db.collection('user');
    collection.remove({})
    for (var i = 0; i < user_list.length; i++){
      var user = user_list[i];
      collection.insert(user)
    }

    var collection = db.collection('leasing');
    collection.remove({})
    for (var i = 0; i < leasing_list.length; i++){
      var leasing = leasing_list[i];
      collection.insert(leasing)
    }

    var collection = db.collection('complex');
    // collection.remove({})
    for (var i = 0; i < complex_list.length; i++){
      var complex = complex_list[i];
      if(complex.length == 6)
        collection.insert(complex)
    }

    db.close()
  }
});
