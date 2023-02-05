const inquirer = require("inquirer");
const questions = require("./lib/questions");
const queries = require("./lib/actions");

require("dotenv").config();
const mysql = require("mysql2");
const cTable = require("console.table");
const db_conn = mysql.createConnection(
  {
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  }
);

async function main () {
  let quit = false;
  while(true) {
    // need to promtp to find what the user wants to do
    let action = await inquirer.prompt(questions.mainMenu);

    // execute action
    switch (action.mainAction.slice(0,2)) {
    case("01"):
      db_conn.query(queries.viewDepartments,[],(err,res) => console.table("\n",res,"\n"));
      console.log("\n Complete! \n");
      break;
    case("02"):
      break;
    case("03"):
      break;
    case("04"):
      break;
    case("05"):
      break;
    case("06"):
      break;
    case("07"):
      break;
    case("08"):
      break;
    case("09"):
      break;
    case("10"):
      break;
    case("11"):
      break;
    case("12"):
      break;
    case("13"):
      break;
    case("14"):
      break;
    case("15"):
      quit = true;
      break;
    default:
      break;
    }
	   
    if (quit) break; 
  }
  process.exit(0);
}
      
main();  
    
       
