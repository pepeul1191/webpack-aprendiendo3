-- migrate:up

INSERT INTO departments (id, name) VALUES
  (1, 'Amazonas'),
  (2, 'Ancash'),
  (3, 'Apurimac'),
  (4, 'Arequipa'),
  (5, 'Ayacucho'),
  (6, 'Cajamarca'),
  (7, 'Callao'),
  (8, 'Cuzco'),
  (9, 'Huancavelica'),
  (10, 'Huánuco'),
  (11, 'Ica'),
  (12, 'Junin'),
  (13, 'La Libertad'),
  (14, 'Lambayeque'),
  (15, 'Lima'),
  (16, 'Loreto'),
  (17, 'Madre de Dios'),
  (18, 'Moquegua'),
  (19, 'Pasco'),
  (20, 'Piura'),
  (21, 'Puno'),
  (22, 'San Martín'),
  (23, 'Tacna'),
  (24, 'Tumbes'),
  (25, 'Ucayali');

-- migrate:down

TRUNCATE departments;