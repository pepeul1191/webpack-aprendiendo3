-- migrate:up

CREATE TABLE teachers (
	id	INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
	names	VARCHAR(40) NOT NULL,
	last_names VARCHAR(40) NOT NULL,
	img	TEXT NOT NULL,
	district_id	INTEGER,
	sex_id	INTEGER
);

-- migrate:down

