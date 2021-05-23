const mysql = require("mysql");
const inquirer = require("inquirer");
// const cTable = require('console.table');

const connection = mysql.createConnection({
  host: "localhost",
  port: 3000,
  user: "root",
  password: "PASSWORD",
  database: "employeesdb",
});

connection.connect((err) => {
    if (err) throw err;
    console.log( `Welcome to the Employee Tracker`);
    firstQuestion()
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
                "View All Departments",
                "View All Roles",
                "Add Employee",
                "Add Role",
                "Add Department",
                "Update Employee Role",
                "Exit"
                ]
            }
        ]).then(function (data) {

        if (data.selection === "View All Employees") {
            viewEmployee();
        } else if(data.selection === "View All Departments") {
            viewDepartment();
        } else if (data.selection === "View All Roles") {
            viewRoles();
        } else if(data.selection === "Add Employee") {
            addEmployee()
        } else if (data.selection === "Add Role") {
            addRole();
        } else if (data.selection === "Add Department") {
            addDepartment();
        } else if(data.selection === "Update Employee Role") {
            updateRole()
        } else if (data.selection === "Exit")
        connection.end()
        })
    }

function viewEmployee() {
  connection.query(`SELECT * FROM employeesdb.employee`, function (err, result) {
    if (err) throw err
    console.table(result)
    firstQuestion()
  })
}

function viewDepartment() {
  connection.query(`SELECT * FROM employeesdb.department`, function (err, result) {
      if(err) throw err
      console.table( result)
      firstQuestion()
    })
}

function viewRoles() { 
  connection.query(`SELECT * FROM employeesdb.role`, function (err, result) {
    if(err) throw err
    console.table(result)
    firstQuestion();
  })
}

async function addDepartment() {
    await inquirer.prompt([
        {
        type: 'input',
        name: 'department',
        message: 'What department would you like to add?',
        }
    ])
    .then(async function(answer){
        connection.query(
            'INSERT INTO department SET ?',
        {
            department_name: answer.department,
        },
        function (err, res) {
            if (err) throw err
            console.table('Added new department: '  + answer.department)
            firstQuestion()
            }
        );
    });
}

async function addEmployee() {
// Get the roles to display for selection
connection.query('SELECT role.id, role.title FROM role', (err, res) => {
    let roles = []
    res.forEach((role) => {
        roles.push(role.title)
    })

    // Get managers to display for selection
    connection.query('SELECT * FROM employee WHERE manager_id IS NULL', (err, res) => {
        let managers = []
        res.forEach((employee) => {
            managers.push(`${employee.first_name} ${employee.last_name}`)
        });

        inquirer.prompt([
            {
                type: 'input',
                name: 'firstName',
                message: 'Enter the employee\'s first name.'
            },
            {
                type: 'input',
                name: 'lastName',
                message: "Enter the employee\'s last name."
            },
            {
                type: 'list',
                name: 'roleName',
                message: 'What is the role of the employee?',
                choices: roles
            },
        ]).then((answer) => {
            let roleID, managerID;
            res.forEach((role) => {
                if (answer.employeeRole === role.title) {
                roleID = role.id
                }
            })

            res.forEach((employee) => {
                if (
                answer.managerName ===
                `${employee.first_name} ${employee.last_name}`
                ) {
                managerID = employee.id
                }
            });
            let query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
            let params = [answer.firstName, answer.lastName, roleID, managerID]
            connection.query(query, params, (err, res) => {
                if (err) throw err
                console.log(('Employee has been added.'))
                firstQuestion()
            })

        })
    })

})
}


async function addRole () {
let departments = []

connection.query(`SELECT * FROM department`, (err, data) => {
    if (err) throw err;

    const departments = data.map(d => ({ name: d.name, value: d.id }))

    inquirer
        .prompt([
            {
                name: 'title',
                type: 'input',
                message: 'What is the role title?'
            },
            {
                name: 'salary',
                type: 'input',
                message: 'What is the salary for this role?'
            },
            {
                name: 'department_id',
                type: 'list',
                message: 'What department is this role in?',
                choices: departments
            }
        ])
        .then(function ({ title, salary, department_id }) {
            // let index = departments.indexOf(department_id);

            connection.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, department_id], (err, res) => {
                if (err) throw err;

                console.log(`Role Added`);
                firstQuestion();
            });
        })
    });
}; 