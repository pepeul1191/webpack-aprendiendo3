-- migrate:up

INSERT INTO sexs (id, name) VALUES
  (1, 'Hombre'),
  (2, 'Mujer')
;

-- migrate:down

TRUNCATE sexs;