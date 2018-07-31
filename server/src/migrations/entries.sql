CREATE TABLE entries (
    id serial NOT NULL,
    title varchar(255) NOT NULL,
    body text NOT NULL,
    feature_image text,
    created_At timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    users_id integer NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (users_id) REFERENCES users(id)
)