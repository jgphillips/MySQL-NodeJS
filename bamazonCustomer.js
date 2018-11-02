var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user:"root",

    //Your password
    password: "root",
    database: "bamazon",
    insecureAuth: true
});

connection.connect(function(err){
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    connection.end();
});

function start () {
    var query = "SELECT * FROM products";
    connection.query(query, function(err, res){
        console.log(res);

        inquirer
        .prompt([
            {
                name:"productSelect",
                type: "input",
                message: "\nEnter the ID of the product you would like to buy",
            },
            {
                name: "unitSelect",
                type: "input",
                message: "Enter the how many units of product you would like to buy"
            }
        ])
        .then(function(answer) {
            var responseProduct = res[parseInt(answer.productSelect)];
            var unitsAnswer = parseInt(answer.unitSelect);

            console.log(unitsAnswer);
            console.log(responseProduct.stock_quantity);

            console.log(answer);    
                    if (unitsAnswer > responseProduct.stock_quantity){
                        console.log("Insufficient quantity!");
                    }
                    else{
                        var unitUpdate = responseProduct.stock_quantity - unitsAnswer;
                        var updateQuery = "UPDATE products SET stock_quantity = ?  WHERE item_id = ?";
                        console.log("\n" +updateQuery);
                        console.log(unitUpdate);
                        console.log(answer.productSelect);
                        connection.query(updateQuery,
                        [unitUpdate,
                        parseInt(answer.productSelect)],
                        function(error, result) {
                            if (error) throw err;
                            // console.log("\n Units left: "+ res[parseInt(answer.productSelect)].stock_quantity);
                            // var databaseCost = res
                            // var cost = answer.unitSelect * res[parseInt(answer.productSelect)].cost
                            console.log('Changed ' + result.affectedRows + ' rows');
                            console.log("\nHere is the total cost of your purchase: " +  "25");
                        });
                    }
        });
    });
}

start();