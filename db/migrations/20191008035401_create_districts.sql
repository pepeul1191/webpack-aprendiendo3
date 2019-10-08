-- migrate:up

CREATE TABLE districts
( id INTEGER PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(40) NOT NULL,
  province_id INTEGER,
  FOREIGN KEY (province_id) 
    REFERENCES provinces(id)
    ON DELETE CASCADE
)

-- migrate:down

DROP TABLE districts;