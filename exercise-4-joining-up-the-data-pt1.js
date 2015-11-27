var mysql = require('mysql');

var connection = mysql.createConnection({
    host: process.env.IP,
    user: process.env.C9_USER,
    password: '',
    database: 'addressbook'
});

connection.query('select Account.id as accountId, Account.email as accountEmail, AddressBook.id as addressBookId, AddressBook.name as addressBookName from Account JOIN AddressBook on Account.id=AddressBook.accountId', function(err, result) {
    if (err) { //if there's an error
        console.log('err');
    }
    var ACCOUNTS = {};
    var ADBOOKS = {};
 

    result.forEach(function(row) {         
        var acc = {                              //creating new variable  = object with new keys renaming old keys
            id: row.accountId,
            email: row.accountEmail,
            addbooks: []
        };
        var ab = {
            id: row.addressBookId,
            name: row.addressBookName
        };

        ACCOUNTS[acc.id] = acc;             //creating new array with new objects
        ADBOOKS[ab.id] = ab;
    });

    var finalResults = [];
    result.forEach(function(row) {
            var acc = ACCOUNTS[row.accountId];          //creating another new variable that flags where we got a result -- duplicates
            var ab = ADBOOKS[row.addressBookId];

            acc.addbooks.push(ab.name);   //pushing field addbooks from acc into addressbook array

            if (finalResults.indexOf(acc) === -1) {     //if there's nothing in finalResults array, push the acc which is the array of addressbooks
                finalResults.push(acc);
            }});
            
            console.log(finalResults);

});

connection.end();