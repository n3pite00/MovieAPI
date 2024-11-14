CREATE TABLE movie_genre (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE movie (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    year INT,
    genre INT,
    FOREIGN KEY (genre) REFERENCES movie_genre (id)
);

CREATE TABLE movie_user (
    username VARCHAR(50) PRIMARY KEY,
    fullname VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    birthyear INT
);
