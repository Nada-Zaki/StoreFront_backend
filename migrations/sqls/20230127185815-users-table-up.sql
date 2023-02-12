CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(35) NOT NULL,
    last_name VARCHAR(80) NOT NULL,
    password VARCHAR NOT NULL
);