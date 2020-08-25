DROP DATABASE IF EXISTS Project3Dev;
CREATE DATABASE Project3Dev;
USE Project3Dev; 

CREATE TABLE movie (
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(256),
poster VARCHAR(256),
year INT,
synopsis TEXT,
format VARCHAR(55),
wishlist BOOLEAN,
PRIMARY KEY(id)
);

INSERT INTO movie (title, poster, year, synopsis, format, wishlist)
VALUES("Spongebob","https://m.media-amazon.com/images/M/MV5BNTk2NzEyNTQtZTQ5MS00MjAyLTgzMDMtNDNkYTBkM2M2OTU3XkEyXkFqcGdeQXVyODUwNjEzMzg@._V1_SX300.jpg"
, 1999, "The misadventures of a talking sea sponge who works at a fast food restaurant, attends a boating school, and lives in an underwater pineapple.",
"Blue-Ray", FALSE );

INSERT INTO movie (title, poster, year, synopsis, format, wishlist)
VALUES("The","https://m.media-amazon.com/images/M/MV5BYjEzN2FlYmYtNDkwMC00NGFkLWE5ODctYmE5NmYxNzE2MmRiXkEyXkFqcGdeQXVyMjMwODc5Mw@@._V1_SX300.jpg"
, 2003, "Johnny is a successful bank executive who lives quietly in a San Francisco townhouse with his future wife Lisa. One day she unscrupulously seduces his best friend Mark. Nothing will ever be the same again",
"", TRUE );