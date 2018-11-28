var express = require('express')
var router = express.Router()
const appointmentsRepository = require('../js/appointments-repository')

router.get('/:id/appointments', async (req, res) => {
  const appointments = await appointmentsRepository.getAppointments(req.params.id)
  res.json(appointments)
})

router.post('/appointments', async (req, res) => {
  await appointmentsRepository.updateAppointment(req.body)
  res.json({success: true})
})

module.exports = router
