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


function printTable(query) {
  connection.query(query, function(error, rows, fields){
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


  })
}

function listItems () {
  printTable('SELECT * FROM tblProducts ORDER BY itemID');
}


function lowInventory (){
  printTable('SELECT * FROM tblProducts WHERE stockQty < 5');
}

function addToInventory() {
  listItems();
  inquirer.prompt([{
    type: 'input',
    message: 'input ID of the item to add: ',
    name: 'addId'
  },
  {
    type: 'input',
    message: 'input quantity to add: ',
    name: 'addQty'
  }
  ]).then(function(response){
    var currentStockQty;
    var newStockQty;
    connection.query('SELECT stockQty FROM tblProducts WHERE ?', [{itemID: response.addId}], function(err, rows){
      if(err) {console.log(err)};
      currentStockQty = rows[0].stockQty;
      console.log("CurrentQty: " + currentStockQty);
      newStockQty = parseInt(response.addQty) + parseInt(currentStockQty);
    });
    // console.log("AddQty: " + typeOf(response.addQty));
    
    connection.query('UPDATE tblProducts SET ? WHERE ?', [{stockQty: newStockQty}, {itemID: response.addId}], function(err, rows){
      if (err) {console.log(err)};
      console.log(rows);
      console.log("NewQty: " + response.addQty);
    });
  });
}

inquirer.prompt([{
  type: 'rawlist',
  message: 'Pick one: ',
  choices: ['View Products for sale', 'View Low Inventory', 'Add To Inventory', 'Add New Product'],
  name: "choice"

}]).then(function(response){
  console.log(response.choice);
  switch (response.choice) {
    case 'View Products for sale':
      listItems();
      break;

    case 'View Low Inventory':
      lowInventory();
      break;

    case 'Add To Inventory':
      addToInventory();
      break;
  }
});