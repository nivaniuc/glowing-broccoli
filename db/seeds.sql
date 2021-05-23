USE employees;

INSERT INTO department (department_name)
VALUES
('Engineering'),
('Admin'),
('Design'),
('Labor');

INSERT INTO roles (title, salary, department_id)
VALUES
('Manager', 55000, 1 ),
('CSS', 38000, 2),
('JS', 44000, 3),
('HTML', 48000, 4),
('Entry Level', 32000, 4);

INSERT INTO employees (first_name, last_name, roles_id, manager_id)
VALUES
('Mike', 'Oxlong', 1, null),
('Drew', 'Ligma', 2, 1),
('Joe', 'Rogan', 2, 1),
('Steve', 'Buschemi', 3, 1),
('Danny', 'Devito', 4, 1),
('Becky', 'Lynch', 4, 1),
('Adam', 'Sandler', 4, 1),
('Pete', 'Bulger', 4, 1);