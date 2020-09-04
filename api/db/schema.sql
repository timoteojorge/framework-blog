
CREATE SCHEMA IF NOT EXISTS db_blog;


ALTER SCHEMA db_blog OWNER TO postgres;

CREATE TABLE db_blog.comment (
    id bigint NOT NULL,
    content character varying(255),
    created_at timestamp without time zone,
    author_id bigint,
    post_id bigint
);

ALTER TABLE db_blog.comment OWNER TO postgres;

CREATE SEQUENCE db_blog.comment_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE db_blog.comment_seq OWNER TO postgres;


CREATE TABLE db_blog.file (
    id bigint NOT NULL,
    data bytea,
    file_name character varying(255),
    file_size bigint,
    file_type character varying(255)
);


ALTER TABLE db_blog.file OWNER TO postgres;


CREATE SEQUENCE db_blog.file_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE db_blog.file_seq OWNER TO postgres;


CREATE TABLE db_blog.post (
    id bigint NOT NULL,
    created_at timestamp without time zone,
    html_content text,
    title character varying(255),
    author_id bigint
);


ALTER TABLE db_blog.post OWNER TO postgres;

CREATE SEQUENCE db_blog.post_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE db_blog.post_seq OWNER TO postgres;


CREATE TABLE db_blog.posts_files (
    post_id bigint NOT NULL,
    file_id bigint NOT NULL
);


ALTER TABLE db_blog.posts_files OWNER TO postgres;


CREATE TABLE db_blog."user" (
    id bigint NOT NULL,
    email character varying(255),
    name character varying(255),
    password character varying(255)
);


ALTER TABLE db_blog."user" OWNER TO postgres;


CREATE SEQUENCE db_blog.user_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE db_blog.user_seq OWNER TO postgres;


ALTER TABLE ONLY db_blog.comment
    ADD CONSTRAINT comment_pkey PRIMARY KEY (id);


ALTER TABLE ONLY db_blog.file
    ADD CONSTRAINT file_pkey PRIMARY KEY (id);


ALTER TABLE ONLY db_blog.post
    ADD CONSTRAINT post_pkey PRIMARY KEY (id);

ALTER TABLE ONLY db_blog.posts_files
    ADD CONSTRAINT ukvdb3xtv2vtbreynsfd4rxg89 UNIQUE (post_id, file_id);


ALTER TABLE ONLY db_blog."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


ALTER TABLE ONLY db_blog.post
    ADD CONSTRAINT fk12njtf8e0jmyb45lqfpt6ad89 FOREIGN KEY (author_id) REFERENCES db_blog."user"(id);


ALTER TABLE ONLY db_blog.posts_files
    ADD CONSTRAINT fka6iirgdd5p6qwpeben4w89qjj FOREIGN KEY (post_id) REFERENCES db_blog.post(id);


ALTER TABLE ONLY db_blog.comment
    ADD CONSTRAINT fkh1gtv412u19wcbx22177xbkjp FOREIGN KEY (author_id) REFERENCES db_blog."user"(id);


ALTER TABLE ONLY db_blog.posts_files
    ADD CONSTRAINT fkomn89vuapaucny4eb8y5xvtvc FOREIGN KEY (file_id) REFERENCES db_blog.file(id);


ALTER TABLE ONLY db_blog.comment
    ADD CONSTRAINT fks1slvnkuemjsq2kj4h3vhx7i1 FOREIGN KEY (post_id) REFERENCES db_blog.post(id);


INSERT INTO db_blog."user"
(id, email, "name", "password")
VALUES(1000000, 'usuarioteste@frwk.com.br', 'Usuário de teste', '$2a$10$wj5CmUuXUrUimDj/pm2V5u5TUge177fzziG6Sk5qVtt7t/xQNgo0G')
on conflict do nothing ;


