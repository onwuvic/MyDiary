CREATE TABLE users (
  id serial NOT NULL PRIMARY KEY,
  firstname varchar(255) NOT NULL,
  lastname varchar(255) NOT NULL,
  email varchar(255) NOT NULL UNIQUE,
  password text NOT NULL,
  created_At timestamp with time zone DEFAULT CURRENT_TIMESTAMP
)