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

let quiers


// need to set questions.{roles,managers,departments}

async function main () {
  let quit = false;
  while(true) {
    // need to promtp to find what the user wants to do
    let action = await inquirer.prompt(questions.mainMenu);

    // execute action
    switch (action.mainAction.slice(0,2)) {
    case("01"): // View all departments
      db_conn.query(queries.viewDepartments,
		    [],
		    (err,res) => console.table("\n",res,"\n\n"));
      break;
    case("02"): // View all roles
      db_conn.query(queries.viewRoles,
		    [],
		    (err,res) => console.table("\n",res,"\n\n"));
      break;
    case("03"): // View all employees
      db_conn.query(queries.viewEmployees,
		    [],
		    (err,res) => console.table("\n",res,"\n\n"));

      break;
    case("04"): // View employees by manager
      db_conn.query(queries.viewEmployeesByManager,
		    [],
		    (err,res) => console.table("\n",res,"\n\n"));

      break;
    case("05"): // View employees by department
      db_conn.query(queries.viewEmployeesByDepartment,
		    [],
		    (err,res) => console.table("\n",res,"\n\n"));

      break;
    case("06"): // View total department budget
      db_conn.query(queries.viewTotBudget,
		    [],
		    (err,res) => console.table("\n",res,"\n\n"));
      
      break;
    case("07"): // Update an employee role

      break;
    case("08"): // Update employee manager
      break;
    case("09"): // Add a department
      break;
    case("10"): // Add a role
      break;
    case("11"): // Add an employee
      break;
    case("12"): // Delete a department
      break;
    case("13"): // Delete a role
      break;
    case("14"): // Delete a employee
      break;
    case("15"): // Quit
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
    
       
