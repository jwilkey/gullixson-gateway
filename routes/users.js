var express = require('express')
var router = express.Router()

router.get('/appointments/:id', (req, res) => {
  res.json(appointments)
})

module.exports = router

const appointments = {
  pending: [],
  scheduled: [],
  completed: [{}]
}