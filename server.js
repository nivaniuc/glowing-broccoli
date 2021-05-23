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
      } else if (data.selection === "View All Employees By Department") {
      } else if (data.selection === "Add Employee") {
      } else if (data.selection === "Remove Employee") {
      } else if (data.selection === "Update Employee Role") {
      } else if (data.selection === "Update Employee Manager") {
      } else if (data.selection === "View All Roles") {
      } else if (data.selection === "Add Role") {
      } else if (data.selection === "Remove Role") {
      } else if (data.selection === "Add Department") {
      } else if (data.selection === "View Department Budget") {
      } else if (data.selection === "Remove Department") {
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
}
