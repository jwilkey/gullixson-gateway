var express = require('express')
var router = express.Router()

router.get('/:id/clients', (req, res) => {
  res.json(clients)
})

module.exports = router

const clients = [
  { name: 'John Doe' },
  { name: 'Janae Watts' }
]