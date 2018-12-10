CREATE TABLE IF NOT EXISTS properties (
  id SERIAL PRIMARY KEY,
  address VARCHAR,
  city VARCHAR NOT NULL,
  county VARCHAR,
  state VARCHAR(2) NOT NULL,
  description VARCHAR,
  userId int REFERENCES users(id) ON DELETE CASCADE
);
