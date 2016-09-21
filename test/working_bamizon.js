var inquirer = require('inquirer');
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "dev", //Your username
    password: "^312ag420QbG", //Your password
    database: "Bamazon",
    debug: false
})

connection.connect(function(err) {
    if (err) {console.log(err)};
});

function listItems() {
  connection.query('SELECT * FROM tblProducts ORDER BY itemID', function(error, rows, fields){
    if (error) {console.log(error)};
    var strOutput = "   ";
    for (var i = 0; i < fields.length; i++) {
      strOutput += fields[i].name;
      strOutput += "   |   ";
    }
    console.log(strOutput);

    

    for (var j = 0; j < rows.length; j++) {
      strOutput = "";
      strOutput += rows[j].itemID + " | " + rows[j].productName + "   | " + rows[j].deptName + "   | " + rows[j].price + "   | " + rows[j].stockQty;
      console.log(strOutput);
    }
    begin();
  });
}


function begin() {
  
  inquirer.prompt([{
    type: 'input',
    message: 'Which item would you like to purchase?',
    name: 'itemNum'
  }]).then(function(response){
    inquirer.prompt([{
      type: 'input',
      message: 'How many?',
      name: 'qty'
    }]).then(function(res){

      console.log("I'm here in the second question before the query ");
      // console.log(res.qty);
      var query = "SELECT stockQty, price FROM tblProducts WHERE itemID=" + response.itemNum; 
      connection.query(query, function(er, row){
        if (er) {console.log(er)};
        if (row[0].stockQty < res.qty) {
          console.log("Insufficient quantity in stock!");
        } else {
          // This means updating the SQL database to reflect the remaining quantity.
          query = "UPDATE tblProducts SET stockQty = " + (row[0].stockQty - res.qty) + " WHERE itemID =" + response.itemNum;
          // console.log(query);
          connection.query(query, function(error1, res){
            if(error1){console.log(error1)}
          });

          // Once the update goes through, show the customer the total cost of their purchase.
          var totalCost = res.qty * row[0].price;
          console.log(" You owe me: " + totalCost);
          begin();
        }
      });
    });
  });
}

listItems();
// connection.end();
