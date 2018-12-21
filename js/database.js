const { Client } = require('pg')

module.exports = {
  async query (sql) {
    const client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: true
    })
    client.connect()

    return new Promise((resolve, reject) => {
      client.query(sql, (err, res) => {
        if (err) {
          reject(err)
        } else {
          resolve(res.rows)
        }
        client.end()
      })
    })
  },
  safeString (s) {
    return s.replace(`''`, `'`)
  }
}
