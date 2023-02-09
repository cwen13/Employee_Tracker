// DONE
var viewDepartments =
    "SELECT name AS 'Department Name' FROM department;";

// DONE
var viewRoles =.
    "SELECT title AS 'Roles' FROM role;";

// DONE
var viewEmployees =
    "SELECT CONCAT(first_name,' ', last_name) AS 'Employee' FROM employee;";

// TODO - neeed to get join working
var viewEmployeesByManager =
    "SELECT CONCAT(e.first_name,' ',e.last_name) AS 'Employee', CONCAT(em.first_name,' ',em.last_name) AS 'Manager' FROM employee AS e JOIN employee AS em ON e.manager_id = em.id;";

// DONE
var viewEmployeesByDepartment =
    "SELECT CONCAT(employee.first_name,' ',emplyee.last_name) AS 'Employee' department.name AS 'Department' FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY department;";

// DONE
var viewTotBudget =
    "SELECT SUM(role.salary) as 'Total Budget', d.name AS 'Department' FROM department AS d JOIN role ON d.id = role.department_id GROUP BY d.name ORDER BY d.name;"

// Done
var updateEmployeeRole =
    "UPDATE employee SET role_id=? WHERE id=?;";
// Done
var updateEmployeeManager =
    "UPDATE employee SET manager_id =? WHERE id=?;";
// Done
var addDepartment =
    "INSERT INTO department (name) VALUES (?);";
// Done
var addRole =
    "INSERT INTO role (title, salary, department_id) VALUES (?,?,?);";
// Done
var addEmployee =
    "INSERT INTO employee (first_name, last_name, role_id, manager_id VALUES (?,?,?,?);";
// DONE
var deleteDepartment =
    "DELETE FROM department WHERE id=?;";
// DONE
var deleteRole =
    "DELETE FROM role WHERE id=?;";
// DONE
var deleteEmployee =
    "DELETE FROM Employee WHERE id=?";


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
