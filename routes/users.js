var express = require('express')
var router = express.Router()
const appointmentsRepository = require('../js/appointments-repository')
const usersRepository = require('../js/users-repository')
const formFiller = require('../js/form-filler')

router.post('/', async (req, res) => {
  await usersRepository.createUser(req.body.email, req.body.password, req.body.name, req.body.role, req.body.property)
  res.json({ success: true })
})

router.get('/:id/property', async (req, res) => {
  const property = await usersRepository.getProperty(req.params.id)
  res.json(property)
})

router.get('/:id/appointments', async (req, res) => {
  const appointments = await appointmentsRepository.getAppointments(req.params.id)
  res.json(appointments)
})

router.post('/:id/appointments', async (req, res) => {
  await appointmentsRepository.createAppointment(req.params.id, req.body.date, req.body.time, req.body.status)
  res.json({ success: true })
})

router.post('/:id/forms/tds', async (req, res) => {
  const form = await formFiller.fillTds(req.body)
  res.download(form)
})

router.post('/appointments', async (req, res) => {
  const updated = await appointmentsRepository.updateAppointment(req.body)
  res.json(updated)
})

router.delete('/appointments', async (req, res) => {
  await appointmentsRepository.deleteAppointment(req.body)
  res.json({ success: true })
})

module.exports = router
