-- migrate:up

CREATE TABLE sexs (
	id	INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
	name	VARCHAR(6) NOT NULL
);

-- migrate:down

DROP TABLE sexs;