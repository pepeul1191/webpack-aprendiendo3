-- migrate:up

CREATE TABLE images (
	id	INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
	name	VARCHAR(30) NOT NULL,
  url	VARCHAR(100) NOT NULL
);

-- migrate:down

DROP TABLE images;