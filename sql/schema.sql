CREATE TABLE guests (
  id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  PRIMARY KEY (id)
)
ENGINE=InnoDB;

INSERT INTO guests (id, name, email) VALUES 
    (1, 'Edy Segura', 'edysegura@gmail.com'),
    (2, 'Lidy Segura', 'lidyber@gmail.com');