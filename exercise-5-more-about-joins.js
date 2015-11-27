var mysql = require('mysql');

var connection = mysql.createConnection({
    host: process.env.IP,
    user: process.env.C9_USER,
    password: '',
    database: 'addressbook'
});

connection.query('select Account.id as accountId, Account.email as accountEmail, AddressBook.id as addressBookId, AddressBook.name as addressBookName from Account LEFT JOIN AddressBook on Account.id=AddressBook.accountId', function(err, result) {
    if (err) { //if there's an error
        console.log('err');
    }
    var ACCOUNTS = {};
    var ADBOOKS = {};


    result.forEach(function(row) {
        var acc = { //creating new variable  = object with new keys renaming old keys separating into two objects
            id: row.accountId,
            email: row.accountEmail,
            addbooks: []
        };
        var ab = {
            id: row.addressBookId,
            name: row.addressBookName
        };

        ACCOUNTS[acc.id] = acc; //sorting into bins using id from new objects
        ADBOOKS[ab.id] = ab;
    });

    // result.forEach(function(row){

    //     var exp = '--no address books--';
    //     if (row.addressBookName===-1){
    //         result.push(exp);

    // }
    // });


    var finalResults = [];
    result.forEach(function(row) {
        var acc = ACCOUNTS[row.accountId]; //creating another new variable that flags where we got a result -- duplicates
        var ab = ADBOOKS[row.addressBookId];

        acc.addbooks.push(ab.name); //pushing field addbooks from acc into addressbook array

        if (finalResults.indexOf(acc) === -1) { //if acc isn't in finalResults array, push the acc which contains the array of addressbooks because it can't be - anything
            finalResults.push(acc);
        }
    });

    finalResults.forEach(function(account) {
        console.log("#" + account.id + ": " + account.email);
        
        account.addbooks.forEach(function(book){
            if (book){
            console.log(book);
            }else {
                console.log("--no address books--");
            }
        });

    });



});

connection.end();