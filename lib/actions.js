// DONE
var viewDepartments =
    "SELECT id, name AS 'Department Name' FROM department;";

// DONE
var viewRoles =
    "SELECT  role.id AS 'Role ID', role.title AS 'Job Title', department.name AS 'Department', role.salary AS 'Salary' FROM role LEFT JOIN department ON role.department_id = department.id;"

// DONE
var viewEmployees =
    "SELECT e.id AS 'Employee ID', e.first_name AS 'First Name', e.last_name AS 'Last Name', role.title AS 'Job Title', department.name AS 'Department', role.salary AS 'Salary', CONCAT(em.first_name,' ',em.last_name) AS 'Their Manager' FROM employee AS e LEFT JOIN employee AS em ON em.id = e.manager_id INNER JOIN role ON e.role_id=role.id INNER JOIN department ON role.department_id = department.id ORDER BY e.id;"

// DONE
var viewEmployeesByManager =
    "SELECT CONCAT(e.first_name,' ',e.last_name) AS 'Employee', CONCAT(em.first_name,' ',em.last_name) AS 'Manager' FROM employee AS e INNER JOIN employee AS em ON em.id=e.manager_id;"
    
// DONE
var viewEmployeesByDepartment =
    "SELECT CONCAT(employee.first_name,' ',employee.last_name) AS 'Employee', department.name AS 'Department' FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY department;";

// DONE
var viewTotBudget =
    "SELECT SUM(role.salary) as 'Total Budget', d.name AS 'Department' FROM department AS d JOIN role ON d.id = role.department_id GROUP BY d.name ORDER BY d.name;"

// DONE
var updateEmployeeRole =
    "UPDATE employee SET role_id=? WHERE id=?";

// DONE
var updateEmployeeManager =
    "UPDATE employee SET manager_id=? WHERE id=?";

// DONE
var addDepartment =
    "INSERT INTO department (name) VALUES (?);";

// DONE
var addRole =
    "INSERT INTO role (title, salary, department_id) VALUES (?,?,?);";

// DONE
var addEmployee =
    "INSERT INTO employee (first_name, last_name, role_id, manager_id VALUES (?,?,?,?);";

// DONE
var deleteDepartment =
    "DELETE FROM department WHERE name=?;";

// DONE
var deleteRole =
    "DELETE FROM role WHERE id=?;";

// DONE
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
