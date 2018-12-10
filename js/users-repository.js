const atob = require('atob')
const database = require('./database')

const createProperty = async (property, userId) => {
  const query = `INSERT INTO properties (address, city, county, state, description, userId) 
    VALUES ('${property.address || ''}', '${property.city || ''}', '${property.county || ''}', '${property.state || ''}', '${property.description || ''}', '${userId}');`
  await database.query(query)
}

module.exports = {
  async createUser (email, password, name, role, property) {
    const pass = atob(password)
    const query = `
      INSERT INTO users (email, password, name, role) VALUES (
        '${email}', crypt('${pass}', gen_salt('bf')), '${name}', '${role}'
      ) RETURNING id;`
    const rows = await database.query(query)
    if (property && rows.length === 1) {
      await createProperty(property, rows[0].id)
    }
    return rows[0]
  },
  async deleteUser (userId) {
    return database.query(`DELETE FROM users WHERE id = '${userId}'`)
  },
  createProperty,
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
  async getProperty (userId) {
    return database.query(`SELECT * FROM properties WHERE userId = '${userId}';`)
      .then(rows => rows.length === 1 ? rows[0] : undefined)
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
