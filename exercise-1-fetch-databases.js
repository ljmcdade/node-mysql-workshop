var mysql = require('mysql');
var databaseNames = [];

var connection = mysql.createConnection({
  host     : process.env.IP,
  user     : process.env.C9_USER,
  password : '',
  database : ''
});

connection.query('show databases', function(err, result){
    if(err){
        console.log('err');
    }
    else{
        //console.log(result);
     result.forEach(function(database){
         //console.log(database.Database);
         databaseNames.push(database.Database);
         
     }); 
     displayNames(databaseNames); 
    } 
    connection.end();
});

function displayNames(namesArray) {
    console.log('List of Databases for user ' + process.env.C9_USER);
    namesArray.forEach(function(eachName){
        console.log(eachName);
    });
} 

