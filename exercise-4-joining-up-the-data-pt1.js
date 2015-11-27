var mysql = require('mysql');

var connection = mysql.createConnection({
    host: process.env.IP,
    user: process.env.C9_USER,
    password: '',
    database: 'addressbook'
});

var finalResultArray = [];
var checkEachObject = {};
//var arr = [];

connection.query('select Account.id as accountId, Account.email as accountEmail, AddressBook.id as addressBookId, AddressBook.name as addressBookName from Account JOIN AddressBook on Account.id=AddressBook.accountId', function(err, result) {
        if (err) {
            console.log('err');
        }
        else if (result != undefined) {
            result.forEach(function(result) {

                //var currentId = result.accountId;
                var currentAccount = checkEachObject[result.accountId];
                if (currentAccount === undefined) {
                    currentAccount = {
                        accountId: result.accountId,
                        accountEmail: result.accountEmail,
                        addressBookName: []
                    };

                    checkEachObject[result.accountId] = currentAccount;
                    finalResultArray.push(currentAccount);
                }
                currentAccount.addressBookName.push(result.addressBookName);

                // for (var i = 0; i < arr.length; i++) {
                //     console.log("#" + i + " " + arr[i].accountEmail + "\n" + arr[i].addressBookName.join(", ") + "\n -----------");
                    
                // }
                
                // console.log(arr);
                
                console.log(result.accountId + ": " + result.accountEmail + ": " +  "\n" + result.addressBookName);
            });
        }

        //arrangeEmails(rows);
        connection.end();
        //console.log(finalResultArray);
    }


);


