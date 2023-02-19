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

let roles, departments, employees;

async function main () {
  let quit = false;
  while(true) {
    // need to prmpt to find what the user wants to do
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
    db_conn.query("SELECT name FROM department;",
		  async (err, results) => {
		    if (err) {
		      console.log("Error:", err);
		      return;
		    }
		    if (results.length) {
//		      console.log(results);
		      departments = results.map((result) => result["name"]);
		      console.log(departments);
//		      var mainRole = questions.mainRole(departments);   
//		      console.log(mainRole);
		      let newRole = await inquirer.prompt(questions.mainRole(departments));
		      console.log(newRole);
		      db_conn.query(queries.addRole,
				    [newRole.role, newRole.salary, departmentID],
				    (err,res) => console.log(`New role: ${newRole} added!`));
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
      questions.departments = db_conn.query("SELECT name, id FROM department;")
      // need to make output an array of objects in following form
      // from given array of [{name:"sdfs",id:23},{name:"gfgdfg",id:8},...]
      // choices: [{name:"title1",value:1},{name:"Title2",value:2},....]
//	.map((entry) => entry["name"]);
      let delDepartment = inquirer.prompt(questions.deleteDepart);
      db_conn.query(queries.deleteDepartment,
		    [delDepartment],
		    (err,res) => console.log(`Deleted ${delDepartment}`));

      break;
    case("13"): //  Delete a role
//      console.log(db_conn);
    db_conn.query("SELECT title, id FROM role;",
		    async (err, results) => {
		      console.log("first");
		      if (err) {
			console.log("Error:",err);
			return;
		      }
		      if (results.length) {
			roles = results.map((result) => { 
			   return {name:result["title"], value:result["id"]};
			});
			console.log(roles);
			try{
			  let delRole = await inquirer.prompt(questions.deleteRole(roles));
			  console.log(delRole["role"]);
			  // this is where the extra things happens
			  try{ 
			    db_conn.query(queries.deleteRole,
 					  [delRole["role"]],
 					  (err,res) => {
					    console.log(`Deleted ${delRole["role"]}`);
					    if(err) console.error(err);
					  });
			    db_conn.query(queries.viewRoles,
					  [],
					  (err,res) => console.table("\n",res,"\n\n"));
			  } catch (err) {
			    console.error(err);
			  }
			} catch (err) {
			  console.error(err);
			}
		      }});

    
      break;
    case("14"): // Delete an employee
    await db_conn.promise().query("SELECT CONCAT( first_name,' ',last_name) AS' Employee Name',id FROM employee;").then(async ([rows,fields]) => {
      //      console.log(Object.keys(questions.yees));
//      console.log(rows);
      questions.deleteEmployee = rows.map((row) => {
	return {name:row["Employee Name"], value:row["id"]};
      });
      //      console.log(questions.deleteEmployee);
      try {
	let delEmployee = await inquirer.prompt(questions.deleteEmployee);
      } catch (err) {
	console.errror(err);
      }
      console.log(delEmployee);
      db_conn.execute(queries.deleteEmployee,
		      [delEmployee.split(' ')],
		      (err,res) => console.table(`Deleted ${delEmployee}`));
    }).catch((err) => console.error(err))
      .then(() => db_conn.end());

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
    
       
