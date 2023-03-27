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


async function main () {
  let action = await inquirer.prompt(questions.mainMenu);
  
  let departments;
  let roles;
  let employees;
  let managers;
  
  // execute action
  switch (action.mainAction.slice(0,2)) {

  case("01"): // DONE View all departments
    db_conn.query(queries.viewDepartments,
		  (err,res) => {
		    console.table("\n",res,"\n\n");
		    main();
		  });
    break;

  case("02"): // DONE View all roles
    db_conn.query(queries.viewRoles,
		  (err,res) => {
		    console.table("\n",res,"\n\n");
		    main();
		  });
    break;
    
  case("03"): // DONE View all employees
    db_conn.query(queries.viewEmployees,
		  (err,res) => {
		    console.table("\n",res,"\n\n")
		    main();
		  });
    break;
    
  case("04"): // DONE View emplyees by manager
    db_conn.query(queries.viewEmployeesByManager,
		  (err,res) => {
		    console.table("\n",res,"\n\n");
		    main();
		  });
    break;
    
  case("05"): // DONE View employees by department
    db_conn.query(queries.viewEmployeesByDepartment,
		  (err,res) => {
		    console.table("\n",res,"\n\n");
		    main();
		  });
    break;

  case("06"): // DONE View total utlized budget
    db_conn.query(queries.viewTotBudget,		    
		  (err,res) => {
		    console.table("\n",res,"\n\n");
		    main();
		  });
    break;
    
  case("07"): // DONE Update an employee role
    db_conn.query(queries.getEmployees,
		  async (err, results) => {
		    if (err) {
		      console.log("Error:", err);
		      return;
		    }
		    if (results.length) {
		      employees = results.map((result) => {
			return {name:result["name"], value:result["id"]}
		      });
		      
		      db_conn.query(queries.getRoles,
			      async (err, results) => {
				if (results.length) {
				  roles = results.map((result) => {
				    return {name:result["title"], value:result["id"]}
				  });
				  inquirer.prompt(questions.updateEmployee(employees))
				    .then((employee) => {
				      console.log(employee["employee"]);
				      inquirer.prompt(questions.updateRole(roles))
					.then((role) => {
					  db_conn.query(queries.updateEmployeeRole,
							[
							  role["role"],
							  employee["employee"]
							],
							(err, res) =>  main()
							);
					})
				    })
				}
			      });
		    }
		  });
    break;
    
  case("08"): // DONE Update employee manager
    db_conn.query(queries.getEmployees,
    		  async (err, results) => {
		    if (err) {
		      console.log("Error:", err);
		      return;
		    }
		    if (results.length) {
		      employees = results.map((result) => {
			return {name:result["name"], value:result["id"]}
		      });
		      db_conn.query(queries.getManagers,
				    async (err, results) => {
				      if (results.length) {
					managers = results.map((result) => {
					  return {name:result["name"], value:result["id"]}
					});
					inquirer.prompt(questions.updateEmployee(employees))
					  .then((employee) => {
					    inquirer.prompt(questions.updateManager(managers))
					      .then((manager) => {
						db_conn.query(queries.updateEmployeeManager,
							      [
								manager["manager"],
								employee["employee"]
							      ],
							      (err, res) => {
								main();
							      });
					      })
					  })
				      }
				    });
		    }
		  });
    
    break;
    
  case("09"): // DONE Add a department
    let newDepartment = await inquirer.prompt(questions.addDepartment);
    console.log(newDepartment);
    db_conn.query(queries.addDepartment,
		  [newDepartment["department"]],
		  (err,res) => {
		    console.log(`New department: ${newDepartment["department"]} added!`);
		    main();
		  });
    break;
    
  case("10"): // DONE Add a role
    db_conn.query("SELECT name, id FROM department;",
		  async (err, results) => {
		    if (err) {
		      console.log("Error:", err);
		      return;
		    }
		    if (results.length) {
		      departments = results.map((result) => {
			return {name:result["name"], value:result["id"]}
		      });
		      var mainRole = questions.mainRole(departments);
		      console.log(mainRole[2]["choices"]);
8		      // let newRole = await
		      inquirer.prompt(mainRole)
			.then((newRole) => {
			  db_conn.query(queries.addRole,
					[
					  newRole.role,
					  newRole.salary,
					  newRole.depart
					],
					(err,res) => {
					  console.log(`New role: ${newRole} added!`);
					  main();
					});
			});
		      
		    }});
    break;
    
  case("11"): // Add an employee
    console.log("level 0");
    db_conn.query(queries.getRoles,
		  async (err, results) => {
		    if (results.length) {
		      roles = results.map((result) => {
			return {name:result["title"], value:result["id"]}
		      });
		      console.log("level 1");
		      db_conn.query(queries.getManagers,
				    async (err, results) => {
				      if (results.length) {
					managers = results.map((result) => {
					  return {name:result["name"], value:result["id"]}
					});
					console.log("level 2");
					
					let newEmployee = await inquirer.prompt(
					  questions.addEmployee.concat(questions.mainEmployee(roles,managers)));

					db_conn.query(queries.addEmployee,
						      [
							newEmployee.firstName,
							newEmployee.lastName,
							newEmployee.role,
							newEmployee.manager
						      ],
						      (err,res) => {
							console.table("\n",res,"\n\n");
							main();
						      });
				      }})
		    }});
				   
		   
    
    break;
    
  case("12"): // DONE Delete a department
    db_conn.query(queries.getDepartments,
		  async (err, results) => {
		    departments = results.map((result) => {
		      return {name:result["name"], value:result["id"]}
		    });
		    let delDepartment = await inquirer.prompt(questions.deleteDepart(departments));
		    console.log("Delete:",delDepartment["department"]);
		    db_conn.query(queries.deleteDepartment,
				  [
				    delDepartment["department"]
				  ],
				  (err,res) => {
				    console.log(`Deleted ${delDepartment}`)
				    main();
				  })
		    
		  });
    
    break;
    
  case("13"): //  DONE Delete a role
    db_conn.query(queries.getRoles,
		  async (err, results) => {
		    roles = results.map((result) => {
		      return {name:result["title"], value:result["id"]}
		    });
		    let delRole = await inquirer.prompt(questions.deleteRole(roles));
 		    db_conn.query(queries.deleteRole,
 				  [
				    delRole["role"]
				  ],
 				  (err,res) => {
				    console.log(`Deleted ${delRole["role"]}`)
				    main();
				  });
		  });
    
    break;
    
  case("14"): // DONE Delete an employee
    db_conn.query(queries.getEmployees,
		  async (err, results) => {
		    employees = results.map((result) => {
		      return {name:result["name"], value:result["id"]}
		    });
		    let delEmployee = await inquirer.prompt(questions.deleteEmployee(employees));
		    db_conn.execute(queries.deleteEmployee,
				    [
				      delEmployee["employee"]
				    ],
				    (err,res) => {
				      console.table(`Deleted ${delEmployee}`);
				      main();
				    });
		  });
    
    break;
  case("15"): // Quit
    process.exit(0);
    break;
  default:
    break;
  }
}

main();  


