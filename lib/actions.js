// Done
var viewDepartments =
    "SELECT id, name AS 'Department Name' FROM department;";

// Done
var viewRoles =
    "SELECT  role.id AS 'Role ID', role.title AS 'Job Title', department.name AS 'Department', role.salary AS 'Salary' FROM role LEFT JOIN department ON role.department_id = department.id;"

// Done
var viewEmployees =
    "SELECT e.id AS 'Employee ID', e.first_name AS 'First Name,e.last_name AS 'Last Name', role.title AS 'JOb Title', department.name AS 'Department', role.salary AS 'Salary', CONCAT(em.first_name,' ',em.last_name) AS 'Their Manager'FROM employee AS e employee AS em INNER JOIN role ON e.role_id=role.id INNER JOIN 

"



// TODO
var viewEmployeesByManager =
    "SELECT CONCAT(e.first_name,' ',e.last_name) AS 'Employee', CONCAT(em.first_name,' ',em.last_name) AS 'Manager' FROM employee AS e, employee AS em INNER JOIN em ON e e.manager_id=em.id;";

// Done
var viewEmployeesByDepartment =
    "SELECT CONCAT(employee.first_name,' ',emplyee.last_name) AS 'Employee' department.name AS 'Department' FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY department;";

// Done
var viewTotBudget =
    "SELECT SUM(role.salary) as 'Total Budget', d.name AS 'Department' FROM department AS d JOIN role ON d.id = role.department_id GROUP BY d.name ORDER BY d.name;"

// Done
var updateEmployeeRole =
    "UPDATE employee SET role_id=? WHERE id=?";

// Done
var updateEmployeeManager =
    "UPDATE employee SET manager_id=? WHERE id=?";

// Done
var addDepartment =
    "INSERT INTO department (name) VALUES (?);";

// Done
var addRole =
    "INSERT INTO role (title, salary, department_id) VALUES (?,?,?);";

// Done
var addEmployee =
    "INSERT INTO employee (first_name, last_name, role_id, manager_id VALUES (?,?,?,?);";

// Done
var deleteDepartment =
    "DELETE FROM department WHERE name=?;";

// Done
var deleteRole =
    "DELETE FROM role WHERE title=?;";

// Done
var deleteEmployee =
    "DELETE FROM employee WHERE first_name=? AND last_name=?;";


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
