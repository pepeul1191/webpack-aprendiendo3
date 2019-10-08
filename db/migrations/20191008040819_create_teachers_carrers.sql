-- migrate:up

CREATE TABLE teachers_carrers (
	id	INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
	teacher_id	INTEGER NOT NULL,
	carrer_id	INTEGER NOT NULL
)

-- migrate:down

