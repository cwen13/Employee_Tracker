const db_conn = require("db_functions");
const cTable = require("console.table");

function viewDepartments() {
  return cTable(db_conn.("SELECT name FROM department;"));
}

function viewRoles() {
  return cTable(db_conn.("SELECT title FROM role;"));
}

function viewEmployees() {
  return cTable(db_conn.("SELECT fisrt_name, last_name FROM employee;"));
}

//TODO
function viewEmployeesByManager() {
  return cTable(db_conn.(
    "SELECT CONCAT(e.first_name," ",e.last_name) AS Employee,
FROM employee AS e
INNER JOIN e 
;"));
}

function viewEmployeeByDepart() {
  return cTable(db_conn.("SELECT name FROM department;"));
}

function viewTotBudget() {
  return cTable(db_conn.("SELECT name FROM department;"));
}

function updateEmployeeRole() {
  return cTable(db_conn.("SELECT name FROM department;"));
}

function updateEmplyeeManager() {
  return cTable(db_conn.("SELECT name FROM department;"));
}

function addDepartment(department) {
  return cTable(db_conn.("INSERT INTO department (name)
                          VALUES (?);",
			  department));
}

function addRole(title, salary, department_id) {
  return cTable(db_conn.("INSERT INTO role (title, salary, department_id)
                          VALUES (?,?,?);",
			 [title, salary, department_id]));
}

function addEmployee(fname, lname,role,manager) {
  return cTable(db_conn.("INSERT INTO employee (first_name, last_name, role_id, manager_id
                          VALUES (?,?,?,?);",
			 [fname, lname, role, manager]));
}

function deleteDepartment() {
  return cTable(db_conn.("SELECT name FROM department;"));
}

function deleteRole() {
  return cTable(db_conn.("SELECT name FROM department;"));
}

function deleteEmployee() {
  return cTable(db_conn.("SELECT name FROM department;"));
}

