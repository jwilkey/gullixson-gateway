const atob = require('atob')
const database = require('./database')

module.exports = {
  async createUser (email, password, name, role) {
    const pass = atob(password)
    const query = `
      INSERT INTO users (email, password, name, role) VALUES (
        '${email}', crypt('${pass}', gen_salt('bf')), '${name}', '${role}'
      );`
    return database.query(query)
  },
  async getUser (email, password) {
    const pass = atob(password)
    return database.query(`SELECT id, email, name, role FROM users WHERE email = '${email}' AND password = crypt('${pass}', password);`)
      .then(rows => {
        return rows.length === 1 ? rows[0] : undefined
      })
  },
  async getClients (userId) {
    const query = `SELECT id, email, name, role ` +
    `FROM users ` +
    `WHERE role = 'client'`
    return database.query(query)
  },
  async isAdmin (userIdToken) {
    if (!userIdToken) {
      return Promise.resolve(false)
    }
    const userId = atob(userIdToken)
    return database.query(`SELECT id FROM users WHERE id = '${userId}' AND role = 'realtor'`)
      .then(rows => rows.length === 1)
  }
}
