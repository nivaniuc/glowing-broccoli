INSERT INTO department (department_name)
VALUES
('Engineering'),
('Admin'),
('Design'),
('Labor');

INSERT INTO role (title, salary, department_id)
VALUES
('Lead', 55000, 1 ),
('CSS', 38000, 2),
('JS', 44000, 3),
('HTML', 48000, 4),
('Entry Level', 32000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Mike', 'Oxlong', 1, 1),
('Drew', 'Ligma', 2, 1),
('Joe', 'Rogan', 2, 1),
('Steve', 'Buschemi', 3, 1),
('Danny', 'Devito', 4, 2),
('Becky', 'Lynch', 4, 2),
('Adam', 'Sandler', 4, 2),
('Pete', 'Bulger', 4, 2);