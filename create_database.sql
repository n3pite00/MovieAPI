CREATE TABLE movie(
    id SERIAL NOT NULL,
    name varchar(255) NOT NULL,
    year integer,
    genre integer,
    PRIMARY KEY(id),
    CONSTRAINT movie_genre_fkey FOREIGN key(genre) REFERENCES movie_genre(id)
);

CREATE TABLE movie_genre(
    id SERIAL NOT NULL,
    name varchar(50) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE review(
    id SERIAL NOT NULL,
    username varchar(50) NOT NULL,
    stars integer,
    review_text text,
    movie_id integer NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT review_username_fkey FOREIGN key(username) REFERENCES movie_user(username),
    CONSTRAINT review_movie_id_fkey FOREIGN key(movie_id) REFERENCES movie(id),
    CONSTRAINT review_stars_check CHECK ((stars >= 1) AND (stars <= 5))
);

CREATE TABLE movie_user(
    username varchar(50) NOT NULL,
    fullname varchar(100) NOT NULL,
    password varchar(100) NOT NULL,
    birthyear integer,
    PRIMARY KEY(username)
);

CREATE TABLE favorites(
    id SERIAL NOT NULL,
    username varchar(50) NOT NULL,
    movie_id integer NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT favorites_username_fkey FOREIGN key(username) REFERENCES movie_user(username),
    CONSTRAINT favorites_movie_id_fkey FOREIGN key(movie_id) REFERENCES movie(id)
);

INSERT INTO movie_genre (name) VALUES 
('drama'),('comedy'),('scifi'),('fantasy'),('action'),('triller');

INSERT INTO movie (name, year, genre) VALUES 
('Inception', 2010, '5'),
('The Terminator', 1984, '5'),
('Tropic Thunder', 2008, '2'),
('Borat', 2006, '2'),
('Interstellar', 2014, '1'),
('Joker', 2019, '1');

INSERT INTO movie_user VALUES
('reimarii', 'Reima Riihimäki', 'qwerty123', 1986),
('lizzy', 'Lisa Simpson', 'abcdef', 1991 ),
('boss', 'Ben Bossy', 'salasana', 1981 )

INSERT INTO review (username, stars, review_text, movie_id) VALUES
('reimarii', 4, 'Could have been better', 2),
('lizzy', 5, 'Amazing', 3),
('boss', 1, 'lacking', 5)

INSERT INTO favorites (username, movie_id) VALUES
('reimarii', 5),
('lizzy', 3),
('boss', 1)
