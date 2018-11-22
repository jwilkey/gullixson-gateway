var express = require('express')
var router = express.Router()

router.get('/:id/appointments', (req, res) => {
  res.json(appointments)
})

module.exports = router

const appointments = {
  pending: [],
  scheduled: [],
  completed: [{}]
}