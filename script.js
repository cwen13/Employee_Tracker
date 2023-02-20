const inquirer = require("inquirer");
const questions = require("./lib/questions");
const queries = require("./lib/queries");

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

let departments;
let roles;
let employees;

async function main () {
  let quit = false;
  while(true) {
    let action = await inquirer.prompt(questions.mainMenu);
    
    // execute action
    switch (action.mainAction.slice(0,2)) {
    case("01"): // DONE View all departments
      db_conn.query(queries.viewDepartments,
		    (err,res) => console.table("\n",res,"\n\n"));
      break;
    case("02"): // DONE View all roles
      db_conn.query(queries.viewRoles,
		    (err,res) => console.table("\n",res,"\n\n"));
      break;

    case("03"): // DONE View all employees
      db_conn.query(queries.viewEmployees,
		    (err,res) => console.table("\n",res,"\n\n"));
      break;
    case("04"): // DONE View emplyees by manager
      db_conn.query(queries.viewEmployeesByManager,
		    (err,res) => console.table("\n",res,"\n\n"));
      break;

    case("05"): // DONE View employees by department
      db_conn.query(queries.viewEmployeesByDepartment,
		    (err,res) => console.table("\n",res,"\n\n"));
      break;
    case("06"): // DONE View total utlized budget
      db_conn.query(queries.viewTotBudget,		    
		    (err,res) => console.table("\n",res,"\n\n"));
      break;
      
    case("07"): // Update an employee role
      db_conn.query(queries.updateEmployeeRole,
		    (err,res) => console.table("\n",res,"\n\n"));

      break;
    case("08"): // Update employee manager
      db_conn.query(queries.updateEmplyeeManager,
		    [],
		    (err,res) => console.table("\n",res,"\n\n"));

      break;
    case("09"): // DONE Add a department
      let newDepartment = await inquirer.prompt(questions.addDepartment);
      console.log(newDepartment);
      db_conn.query(queries.addDepartment,
		    [newDepartment["department"]],
		    (err,res) => console.log(`New department: ${newDepartment} added!`));
      break;
      
    case("10"): // Add a role
      db_conn.query("SELECT name, id FROM department;",
		  async (err, results) => {
		    if (err) {
		      console.log("Error:", err);
		      return;
		    }
		    if (results.length) {
		      departments = results.map((result) => {
			return {name:result["name"], value:result["id"]}});
		      console.log(departments);
		      var mainRole = questions.mainRole(departments);
		      console.log(mainRole);
		      let newRole = await inquirer.prompt(mainRole)
			  .then(() => {
			    db_conn.query(queries.addRole,
					  [newRole.role, newRole.salary, departmentID],
					  (err,res) => console.log(`New role: ${newRole} added!`));
			  });
		    
		    }});
    break;
    case("11"): // Add an employee
      let newEmployee = await inquirer.prompt(
	questions.addEmployee.push(questions.mainEmployee));
      db_conn.query(queries.addEmpolyee,
		    [newEmployee.firstName,
		     newEmployee.lastName,
		     newEmployee.rold_id,
		     newEmployee.manager_id
		    ],
		    (err,res) => console.table("\n",res,"\n\n"));

      break;
    case("12"): // Delete a department
      db_conn.query(queries.getDepartments,
		    async (err, results) => {
		      departments = results.map((result) => {
			return {name:result["name"], value:result["id"]}});
		      let delDepartment = await inquirer.prompt(questions.deleteDepart(departments));
		      console.log("Delete:",delDepartment);
			db_conn.query(queries.deleteDepartment,
				      [delDepartment],
				      (err,res) => console.log(`Deleted ${delDepartment}`)
				     );
		    });
      
      break;
    case("13"): //  Delete a role
      db_conn.query(queries.getRoles,
		    async (err, results) => {
		      roles = results.map((result) => {
			return {name:result["title"], value:result["id"]}
		      });
		      let delRole = await inquirer.prompt(questions.deleteRole(roles));
 		      db_conn.query(queries.deleteRole,
 				    [delRole["role"]],
 				    (err,res) => console.log(`Deleted ${delRole["role"]}`);
				   );
		    });
    
      break;
    case("14"): // Delete an employee
      db_conn.query(queries.getEmployees,
		    async (err, results) => {
		      employees = results.map((result) => {
			return {name:result["name"], value:result["id"]}
		      });
		      let delEmployee = await inquirer.prompt(questions.deleteEmployee(employees));
		      db_conn.execute(queries.deleteEmployee,
				      [delEmployee],
				      (err,res) => console.table(`Deleted ${delEmployee}`)
				     );
		    });
      
      break;
  case("15"): // Quit
    quit = true;
    break;
  default:
    break;
  }
    if (quit) break;
  }

//   if (!quit) main();
    
  process.exit(0);
}
      
main();  
    
       
