CREATE DATABASE technical_test;

CREATE TABLE countries (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  status BOOLEAN,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
CREATE DATABASE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  mail VARCHAR(100),
  country_id INTEGER REFERENCES countries(id),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);