-- migrate:up

CREATE VIEW vw_teachers_locations AS
  SELECT 
  T.id, T.names, T.last_names,  T.img, 
  D.id AS district_id,  CONCAT(D.name, ', ', PR.name, ', ', DE.name) AS district_name,
  S.id AS sex_id, S.name AS sex_name
  FROM teachers T 
  JOIN districts D ON D.id = T.district_id 
  JOIN provinces PR ON D.province_id = PR.id
  JOIN departments DE ON PR.department_id = DE.id
  JOIN sexs S ON S.id = T.sex_id
  LIMIT 2000

-- migrate:down

DROP VIEW IF EXISTS vw_teachers_locations;