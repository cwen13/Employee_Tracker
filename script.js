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
    case("04"): // View emplyees by manager
      db_conn.query(queries.viewEmployeesByManager,
		    [],
		    (err,res) => console.table("\n",res,"\n\n"));

      break;
    case("05"): // View employees by department
      db_conn.query(queries.viewEmployeesByDepartment,
		    [],
		    (err,res) => console.table("\n",res,"\n\n"));

      break;
    case("06"): // View total utlized budget
      db_conn.query(queries.viewTotBudget,
		    [],
		    (err,res) => console.table("\n",res,"\n\n"));

      break;
    case("07"): // Update an employee role
      db_conn.query(queries.updateEmployeeRole,
		    [],
		    (err,res) => console.table("\n",res,"\n\n"));

      break;
    case("08"): // Update employee manager
      db_conn.query(queries.updateEmplyeeManager,
		    [],
		    (err,res) => console.table("\n",res,"\n\n"));

      break;
    case("09"): // Add a department
      db_conn.query(queries.addDepartment,
		    [],
		    (err,res) => console.table("\n",res,"\n\n"));

      break;
    case("10"): // Add a role
      db_conn.query(queries.addRole,
		    [],
		    (err,res) => console.table("\n",res,"\n\n"));

      break;
    case("11"): // Add an employee
      db_conn.query(queries.addEmpolyee,
		    [],
		    (err,res) => console.table("\n",res,"\n\n"));

      break;
    case("12"): // Delete a department
      db_conn.query(queries.deleteDepartment,
		    [],
		    (err,res) => console.table("\n",res,"\n\n"));

      break;
    case("13"): // Delete a role
      db_conn.query(queries.deleteRole,
		    [],
		    (err,res) => console.table("\n",res,"\n\n"));

      break;
    case("14"): // Delete an employee
      db_conn.query(queries.deleteEmployee,
		    [],
		    (err,res) => console.table("\n",res,"\n\n"));

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
    
       
