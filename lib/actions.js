
var viewDepartments =
    "SELECT name AS 'Department Name' FROM department;";

var viewRoles =
    "SELECT title AS 'Roles' FROM role;";

var viewEmployees =
    "SELECT CONCAT(first_name,' ', last_name) AS 'Employee' FROM employee;";

// TODO - neeed to get join working
var viewEmployeesByManager =
    "SELECT CONCAT(e.first_name,' ',e.last_name) AS 'Employee', CONCAT(e.first_name,' ',last_name) AS 'Manager' FROM employee AS e INNER JOIN e ON e employee.manager_id = employee.id GROUP BY 'Manager' ORDER BY 'Manager';";


var viewEmployeesByDepartment =
    "SELECT CONCAT(employee.first_name,' ',emplyee.last_name) AS 'Employee' department.name AS 'Department' FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY department;";

var viewTotBudget =
    "SELECT SUM(role.salary) as 'Total Budget', d.name AS 'Department' FROM department AS d JOIN role ON d.id = role.department_id GROUP BY d.name ORDER BY d.name;"

var updateEmployeeRole =
    "SELECT name FROM department;";

var updateEmployeeManager =
    "SELECT name FROM department;";

var addDepartment =
    "INSERT INTO department (name) VALUES (?);";

var addRole =
    "INSERT INTO role (title, salary, department_id) VALUES (?,?,?);";

var addEmployee =
    "INSERT INTO employee (first_name, last_name, role_id, manager_id VALUES (?,?,?,?);";

var deleteDepartment =
    "SELECT name FROM department;";

var deleteRole =
    "SELECT name FROM department;";

var deleteEmployee =
    "SELECT name FROM department;";


module.exports = {
  viewDepartments,
  viewRoles,
  viewEmployees,
  viewEmployeesByManager,
  viewTotBudget,
  viewEmployeesByDepartment,
  updateEmployeeRole,
  updateEmployeeManager,
  addDepartment,
  addRole,
  addEmployee,
  deleteDepartment,
  deleteRole,
  deleteEmployee
};
