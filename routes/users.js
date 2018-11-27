var express = require('express')
var router = express.Router()

router.get('/:id/appointments', (req, res) => {
  console.log(req.params.id)
  res.json(req.params.id === '333' ? appointments333 : appointments222)
})

router.post('/appointments', (req, res) => {
  res.json({success: true})
})

module.exports = router

const appointments333 = {
  pending: [{date: '2018-12-30', time: '17:33', status: 'pending'}],
  declined: [{date: '2018-10-30', time: '9:33', status: 'declined'}],
  scheduled: [],
  completed: [{date: '2018-11-12', time: '7:33', status: 'completed'}, {date: '2018-11-17', time: '9:33', status: 'completed'}]
}

const appointments222 = {
  pending: [],
  declined: [],
  scheduled: [{date: '2018-12-28', time: '11:33', status: 'scheduled'}, {date: '2019-2-8', time: '10:43', status: 'scheduled'}],
  completed: []
}