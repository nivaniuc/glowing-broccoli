const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');


const connection = mysql.createConnection({
    host: 'localhost',
    port: 3000,
    user: 'root',
    password: 'PASSWORD',
    database: 'employees'
  });

  connection.connect(err => {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId + '\n');
    firstQuestion()
  });

  function firstQuestion() {
    inquirer
        .prompt([
           {}
        ])

 connection.end()

}