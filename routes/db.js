
var express = require('express')
var router = express.Router()
const database = require('../js/database')

router.get('/schema', async (req, res) => {
  const rows = await database.query('SELECT * FROM pg_catalog.pg_tables;')
  res.json(rows)
})

router.get('/constraints/:table', async (req, res) => {
  const rows = await database.query(`SELECT conname FROM pg_constraint WHERE conrelid = '${req.params.table}'::regclass::oid`)
  res.json(rows)
})

module.exports = router
