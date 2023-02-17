
var roles;
var employees;
var managers;
var departments;


const mainAnswers = [
  "01. View all departments",
  "02. View all roles",
  "03. View all employees",
  "04. View employees by manager",
  "05. View employees by department",
  "06. View total utlized budget of a department",
  "07. Update an employee role",
  "08. Update employee managers",
  "09. Add a department",
  "10. Add a role",
  "11. Add an employee",
  "12. Delete department",
  "13. Delete role",
  "14. Delete employee",
  "15. Quit",
];


let mainMenu = [
  {
    type:"list",
    message:"What action do you want to take?",
    choices: mainAnswers,
    name:"mainAction",
  }
];

let addDepartment = [
  {
    type:"input",
    message:"What is the new department?",
    name:"department",
  }
];

let addRole = [
  {
    type:"input",
    message:"What is the new role title?",
    name:"role",
  },
];

let updateRole = [
  {
    type:"list",
    message:"Update which role?",
    choices: roles,
    name:"role"
  },
];
    

let mainRole = [
  {
    type:"input",
    message:"Salary for this position?",
    name:"salary"
  },
  {
    type:"choice",
    message:"What department is this role in?",
    choices: departments,
    name:"depart"
  }
];

let addEmployee = [
  {
    type:"input",
    message:"Emplyee's first name?",
    name:"firstName",
  },
  {
    type:"input",
    message:"Employee's last name?",
    name:"lastName"
  },
];

let updateEmployee = [
  {
    type:"list",
    message:"which emplyee is to be updated?",
    choice: employees,
    name:"employee"
  }
];

let mainEmplyee = [
  {
    type:"list",
    message:"Emplyee's role?",
    choices: roles,
    name:"role"
  },
  {
    type:"list",
    message:"Employee's manager?",
    choices: managers,
    name:"manager"
  }
];

let deleteDepart = (departments) => {
  return    [
    {
      type:"list",
      message:"Delete which department?",
      choices: departments,
      name:"department"
    }
  ];
}

let deleteRole = (roles) => {
  return  [
    {
      type:"list",
      message:"Delete which role?",
      choices: roles,
      name:"role"
    }
  ];
}
  
let deleteEmployee = [
  {
    type:"list",
    message:"Delete which employee?",
    choices: employees,
    name:"employee"
  }
];

module.exports = {
  mainAnswers,
  mainMenu,
  addDepartment,
  addRole,
  updateRole,
  mainRole,
  addEmployee,
  updateEmployee,
  deleteDepart,
  deleteRole,
  deleteEmployee,
  roles,
  employees,
  managers,
  departments

}
