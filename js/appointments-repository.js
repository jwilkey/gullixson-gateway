const database = require('./database')

const statusSort = { declined: -2, canceled: -1, pending: 0, scheduled: 1, completed: 10 }

module.exports = {
  async createAppointment (userId, { date, time, status, label }) {
    const insertAppointmentQuery = `
      INSERT INTO appointments (date, time, status, label) VALUES (
        '${date}', '${time}', '${status}', '${database.safeString(label)}'
      ) RETURNING *;`
    const rows = await database.query(insertAppointmentQuery)

    const apptId = rows[0].id
    const usersAppointmentsQuery = `
      INSERT INTO usersAppointments (userId, appointmentId) 
      VALUES ('${userId}', '${apptId}');
    `
    return database.query(usersAppointmentsQuery)
  },
  async getAppointments (userId) {
    const query = `SELECT appointments.id, appointments.date, appointments.time, appointments.status, appointments.label ` +
    `FROM appointments, usersAppointments ` +
    `WHERE appointments.id = usersAppointments.appointmentId ` +
    `AND usersAppointments.userId = ${userId};`
    return database.query(query)
      .then(rows => {
        rows.forEach(a => {
          if (a.status === 'scheduled' && new Date(a.date + ', 22:00') < new Date()) {
            a.status = 'completed'
          }
        })
        return rows.sort((a1, a2) => statusSort[a1.status] - statusSort[a2.status])
      })
  },
  async updateAppointment (appointment) {
    const label = database.safeString(appointment.label)
    const query = `
      UPDATE appointments SET date = '${appointment.date}', time = '${appointment.time}', status = '${appointment.status}', label = '${label}' 
      WHERE id = ${appointment.id} 
      RETURNING *;
    `
    return database.query(query)
  },
  async deleteAppointment (appointment) {
    const query = `
      DELETE FROM appointments WHERE id = '${appointment.id}'
    `
    return database.query(query)
  }
}
