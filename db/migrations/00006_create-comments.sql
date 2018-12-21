CREATE TABLE IF NOT EXISTS comments (
  id SERIAL PRIMARY KEY,
  createdAt TIMESTAMP DEFAULT NOW(),
  userId int REFERENCES users(id) ON DELETE CASCADE,
  authorId int REFERENCES users(id),
  tags jsonb,
  message VARCHAR
);
