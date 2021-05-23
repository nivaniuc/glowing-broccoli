const mysql = require("mysql");
const inquirer = require("inquirer");
// const cTable = require('console.table');

const connection = mysql.createConnection({
  host: "localhost",
  port: 3000,
  user: "root",
  password: "PASSWORD",
  database: "employees",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  firstQuestion();
});

function firstQuestion() {
  inquirer
    .prompt([
      {
        name: "selection",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "View All Employees By Manager",
          "View All Employees By Department",
          "Add Employee",
          "Remove Employee",
          "Update Employee Role",
          "Update Employee Manager",
          "View All Roles",
          "Add Role",
          "Remove Role",
          "Add Department",
          "View Department Budget",
          "Remove Department",
          "Exit",
        ],
      },
    ])
    
    .then(function (data) {
      if (data.selection === "View All Employees") {
        viewEmployee();
      } else if (data.selection === "View All Employees By Manager") {
        viewManager();
      } else if (data.selection === "View All Employees By Department") {
        viewDepartment();
      } else if (data.selection === "Add Employee") {
        addEmployee();
      } else if (data.selection === "Remove Employee") {
        removeEmployee();
      } else if (data.selection === "Update Employee Role") {
        updateRole();
      } else if (data.selection === "Update Employee Manager") {
        updateManager();
      } else if (data.selection === "View All Roles") {
        viewRoles();
      } else if (data.selection === "Add Role") {
        addRole();
      } else if (data.selection === "Remove Role") {
        removeRole();
      } else if (data.selection === "Add Department") {
        addDepartment();
      } else if (data.selection === "View Department Budget") {
        viewBudget();
      } else if (data.selection === "Remove Department") {
        removeDepartment();
      } else data.selection === "Exit";
      connection.end();
    });
}
const viewEmployee = () => {
  connection.query("SELECT * FROM employees", function (err, res) {
    if (err) throw err;
    console.table(res);
    firstQuestion();
  });
};

const viewManager = () => {
  connection.query(
    "SELECT * FROM employees WHERE roles_id = 1", function (err, res) {
    if (err) throw err;
    console.table(res);
    firstQuestion();
  });
};

const viewDepartment = () => {
  connection.query("SELECT * FROM departments", function (err, res) {
    if (err) throw err;
    console.table(res);
    inquirer
      .prompt([
        {
          name: "deptName",
          type: "list",
          message: "What department would you like to see?",
          choices: [
            "Engineering",
            "Admin",
            "Design",
            "Labor",
            "Back to Main Menu",
          ],
        },
      ])
      .then(function (data) {
        if (data.deptName === "Engineering") {
          connection.query(
            "SELECT * FROM employees WHERE ? = department_id",
            function (err, res) {
              if (err) throw err;
              console.table(res);
              viewDepartment();
            }
          );
        } else data.deptName === "Back to Main Menu";
        firstQuestion();
      });
  });
};