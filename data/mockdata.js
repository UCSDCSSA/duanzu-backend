var MongoClient = require('mongodb').MongoClient;
var username = 'admin'
var password = 'DE54mdvb5p9swfi9'
var host = 'test-shard-00-01-cgxsm.mongodb.net:27017'
MongoClient.connect('mongodb://'+username+':'+password+host, function(err, db){
  if(err){ 
    console.log("Please check you db connection parameters");
  }else{
    console.log("Connection success");
    // here we are going to write code for file
  }
});
var fs = require('fs');

// db = db.getSiblingDB('cssa');
// db.user.remove({})
var filename = 'user.txt';
// var str = JSON.stringify(userList, null, 4);

// fs.writeFile(filename, str, function(err){
//     if(err) {
//         console.log(err)
//     } else {
//         console.log('File written!');
//     }
// });

var userList = JSON.parse(fs.readFileSync(filename).toString('utf-8'));
 
for (var i = 0; i < userList.length; i++){
    var user = userList[i];
    db.user.insert({username: user.username, email: user.email, real_name: user.real_name, qr_code: user.qr_code})
}
