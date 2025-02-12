DROP TABLE IF EXISTS attraction;

CREATE TABLE attraction (
    attraction_id int auto_increment,
    primary key(attraction_id),
    nom varchar(255) not null,
    description varchar(255) not null,
    difficulte int,
    visible bool default true
);

DROP TABLE IF EXISTS users;

CREATE TABLE users (
    users_id int auto_increment,
    primary key(users_id),
    name varchar(255) not null,
    password varchar(255) not null
);

DROP TABLE IF EXISTS Critique;


CREATE TABLE Critique (
   id INT AUTO_INCREMENT PRIMARY KEY,
   attraction_id INT NOT NULL,
   nom VARCHAR(100),
   prenom VARCHAR(100), 
   note INT NOT NULL CHECK (note >= 0 AND note <= 5),
   texte TEXT NOT NULL,
   FOREIGN KEY (attraction_id) REFERENCES attraction(attraction_id) ON DELETE CASCADE
);
