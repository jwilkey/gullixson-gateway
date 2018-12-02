const { createDb, migrate } = require('postgres-migrations')

const uri = process.env.DATABASE_URL
migrate({
  connectionString: uri,
  database: 'x',
  user: 'x',
  password: 'x',
  host: 'x',
  port: 5432,
  ssl: true
}, 'db/migrations')
  .then(res => {
    console.log(res)
  })
  .catch((err) => {
    console.log(err)
  })
