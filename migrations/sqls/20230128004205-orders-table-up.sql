CREATE TABLE orders (
    id SERIAL PRIMARY KEY, 
    status BOOLEAN NOT NULL, 
    user_id bigint NOT NULL REFERENCES users(id)) ;