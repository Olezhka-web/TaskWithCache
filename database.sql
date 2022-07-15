CREATE TABLE "films"(
    id SERIAL PRIMARY KEY UNIQUE,
    title VARCHAR(256) UNIQUE,
    description VARCHAR(256)
);
