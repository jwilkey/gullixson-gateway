const atob = require('atob')
const database = require('./database')

const safeUserColumns = 'id, email, name, role, status'

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
  async updateUser (userId, options) {
    let updates = []
    if (['active', 'closed'].includes(options.status)) {
      updates.push(`status = '${options.status}'`)
    }
    if (!updates.length) throw new Error('No updates provided')

    const query = `
      UPDATE users SET ${updates.join(', ')}
      WHERE id = ${userId} 
      RETURNING ${safeUserColumns};
    `
    return database.query(query)
      .then(rows => rows.length === 1 ? rows[0] : { error: true })
  },
  async deleteUser (userId) {
    return database.query(`DELETE FROM users WHERE id = '${userId}'`)
  },
  async saveUserState (userId, key, value) {
    const valueString = JSON.stringify(value)
    const query = `INSERT INTO usersState (userId, key, value)
      VALUES ( ${userId}, '${key}', '${valueString}' ) 
      ON CONFLICT ON CONSTRAINT usersstate_pkey 
      DO UPDATE SET value = '${valueString}';`
    return database.query(query)
  },
  async getUserState (userId, key) {
    const rows = await database.query(`SELECT * FROM usersState WHERE userId = '${userId}' AND key = '${key}';`)
    return rows.length === 1 ? safeParse(rows[0]) : {}
  },
  async deleteUserState (userId, key) {
    return database.query(`DELETE FROM usersState WHERE userId = ${userId} AND key = '${key}'`)
  },
  createProperty,
  async getUser (email, password) {
    const pass = atob(password)
    return database.query(`SELECT ${safeUserColumns} FROM users WHERE email = '${email}' AND password = crypt('${pass}', password);`)
      .then(rows => {
        return rows.length === 1 ? rows[0] : undefined
      })
  },
  async getEmail (userId) {
    const rows = await database.query(`SELECT email FROM users WHERE id = ${userId};`)
    return rows.length === 1 ? rows[0].email : undefined
  },
  async getClients (userId) {
    const query = `SELECT ${safeUserColumns} ` +
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

const safeParse = (row) => {
  try {
    row.value = JSON.parse(row.value)
  } catch (e) { }
  return row
}
