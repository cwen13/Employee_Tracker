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
    case("09"): // DONE Add a department
      let newDepartment = await inquirer.prompt(questions.addDepartment);
      db_conn.query(queries.addDepartment,
		    [],
		    (err,res) => console.log(`New department: ${newDepartment} added!`));
      break;
    case("10"): // DONE Add a role
      questions.departments = db_conn.query("SELECT name FROM department;")
//	.map((entry) => entry["name"]);
//      let newRole = await inquirer.prompt(
//	questions.addRole.append(questions.mainRole));
//      let departmentID = db_conn.query(`SELECT id FROM department WHERE name=${newRole.depart};`,
//				       [],
//				       (err, res) => return 0);
//      db_conn.query(queries.addRole,
//		    [newRole.role, newRole.salary, departmentID],
//		    (err,res) => console.log(`New role: ${newRole} added!`));
//
      break;
    case("11"): // Add an employee
      db_conn.query(queries.addEmpolyee,
		    [],
		    (err,res) => console.table("\n",res,"\n\n"));

      break;
    case("12"): // Delete a department
      questions.departments = db_conn.query("SELECT name FROM department;")
//	.map((entry) => entry["name"]);
      let delDepartment = inquirer.prompt(questions.deleteDepart);
      db_conn.query(queries.deleteDepartment,
		    [delDepartment],
		    (err,res) => console.table(`Deleted ${delDepartment}`));

      break;
    case("13"): // DONE Delete a role
      questions.roles = db_conn.query("SELECT title FROM role;")
//	.map((entry) => entry["title"]);
      let delRole = inquirer.prompt(questions.deleteRole);
      db_conn.query(queries.deleteRole,
		    [delRole],
		    (err,res) => console.table(`Deleted ${delRole}`));

      break;
    case("14"): // Delete an employee
      questions.employees = db_conn.query("SELECT CONCAT( first_name,' ',last_name) AS Employee Name' FROM employee;")
      console.log(typeof questions.emplyees);
      
//	.map((entry) => entry["Employee Name"]);
      let delEmployee = await inquirer.prompt(questions.deleteEmployee);
      db_conn.query(queries.deleteEmployee,
		    [delEmployee.split(' ')],
		    (err,res) => console.table(`Deleted ${delEmployee}`));

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
    
       
