var mysql = require('mysql');
var Table = require('cli-table');
var colors = require('colors');

var connection = mysql.createConnection({
host : process.env.IP,
user : process.env.C9_USER,
password : '',
database : 'addressbook'
});

var table = new Table({
    head: ['id', 'email']
});

connection.query('select id, email from Account limit 5', function(err, result){
    if (err){
        console.log('err');
    }
    else if (result){
    //result.forEach(function(rows){
        //console.log(result);
        
        for(var i=0; i< result.length; i++){
             table.push([result[i].id.toString().bold, result[i].email]);
         }
         console.log(table.toString());
    }

    connection.end();
});

// function boldIds(emailArray){
//     emailArray.forEach(function(eachId){
//         console.log(eachId);
//     });
// }

// //boldIds();




/*else{
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
}*/