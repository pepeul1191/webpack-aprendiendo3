-- migrate:up

CREATE TABLE departments (
	id	INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
	name	VARCHAR(30) NOT NULL
)

-- migrate:down

DROP TABLE departments;