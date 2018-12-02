CREATE TABLE IF NOT EXISTS appointments (
  id SERIAL PRIMARY KEY,
  date VARCHAR(10) NOT NULL,
  time VARCHAR(10) NOT NULL,
  status VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS usersAppointments (
  userId int REFERENCES users(id) ON DELETE CASCADE,
  appointmentId int REFERENCES appointments(id) ON DELETE CASCADE,
  PRIMARY KEY (userId, appointmentId)
);
