CREATE TABLE department (
    
    id INTEGER PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    title VARCHAR(30),
    salary DECIMAL(10, 2),
    department_id INT
);

CREATE TABLE employee (
    id INTEGER PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT
);