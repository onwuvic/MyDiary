\c test

CREATE TABLE entries (
    id serial NOT NULL,
    title varchar(255) NOT NULL,
    body text NOT NULL,
    created_At timestamp with time zone NOT NULL DEFAULT NOW(),
    users_id integer NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (users_id) REFERENCES users(id)
)