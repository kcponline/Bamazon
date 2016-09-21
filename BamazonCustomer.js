// pseudo 01 - check connection to database and npm
var Inquirer = require('inquirer');
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root", //Your username
    password: "pa55w0rd", //Your password
    database: "Bamazon",
})

// // pseudo 02 - confirm database connection
// connection.connect(function(err) {
//     if (err) throw err;
//     console.log("connected as id " + connection.threadId);
// })

// pseudo 03 - function to display the items ; should consider changing this to be a prototype of constructor
function itemListing() {

  connection.query('SELECT * FROM Products ORDER BY itemID', function(error, rows, columns){
    
    if (err) throw err;

    	var items = "   ";

	    for (var i = 0; i < columns.length; i++) {

			items += columns[i].name;
			items += "   |   ";
	    }
	    
	    console.log(items);

	    for (var j = 0; j < rows.length; j++) {

			items = "";
			items += rows[j].itemID + " | " + rows[j].ProductName + "   | " + rows[j].DepartmentName + "   | " + rows[j].Price + "   | " + rows[j].StockQuantity;
			console.log(items);

	    }

    greeting();

  });

};

// pseudo 04 - initial message when app starts prompting for user selection
function greeting() {
  
  Inquirer.prompt([{

	type: 'input',
	message: 'Please enter the ID of the product that you would like to buy?',
	name: 'tentativeItemID'

  }]).then(function(response){

    Inquirer.prompt([{

      type: 'input',
      message: 'How many units of the product would you like to buy?',
      name: 'tentativeQuantity'

    }]).then(function(res){
      // console.log(res.tentativeQuantity);
      var query = "SELECT StockQuantity, price FROM Products WHERE itemID=" 
      + response.tentativeItemID;

      connection.query(query, function(err, row){
        if (err) throw err;

        if (row[0].StockQuantity < res.tentativeQuantity) {

          	console.log("Insufficient quantity!");

        }else {
          
			query = "UPDATE Products SET StockQuantity = " + (row[0].StockQuantity 
			- res.tentativeQuantity) + " WHERE itemID =" + response.tentativeItemID;
          
			connection.query(query, function(err, res){
            	if (err) throw err;
        	});

          	var totalCost = res.tentativeQuantity * row[0].price;
          	
          	console.log(" Total Cost: " + totalCost);
          	
          	greeting();

        }
      });
    });
  });
}

// itemListing();

greeting();
