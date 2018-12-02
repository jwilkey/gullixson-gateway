CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  name VARCHAR(60),
  role VARCHAR(20)
);

INSERT INTO users (email, password, name, role) VALUES (
  'tentkeep@gmail.com',
  crypt('gullixson', gen_salt('bf')),
  'Justin',
  'realtor'
);