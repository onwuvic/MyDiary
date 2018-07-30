CREATE TABLE entries (
    id serial NOT NULL PRIMARY KEY,
    title character varying(255) NOT NULL,
    body text NOT NULL,
    feature_image character varying(255),
    created_at timestamp without time zone NOT NULL DEFAULT now(),
    users_id integer NOT NULL,
    CONSTRAINT entries_pkey PRIMARY KEY (id),
    CONSTRAINT entries_users_id_fkey FOREIGN KEY (users_id)
        REFERENCES public.users (id) MATCH SIMPLE
)