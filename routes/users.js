var express = require('express')
var router = express.Router()
const appointmentsRepository = require('../js/appointments-repository')
const usersRepository = require('../js/users-repository')
const formFiller = require('../js/form-filler')
const aws = require('../js/aws')

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

router.get('/:id/state/:key', async (req, res) => {
  const state = await usersRepository.getUserState(req.params.id, req.params.key)
  res.json(state)
})

router.post('/:id/state', async (req, res) => {
  await usersRepository.saveUserState(req.params.id, req.body.key, req.body.value)
  res.json({ success: true })
})

router.post('/:id/forms/tds', async (req, res) => {
  const file = await formFiller.fillTds(req.body, req.params.id)
  res.json({ file })
})

router.get('/:id/files/:file', async (req, res) => {
  const awsResource = await aws.get(req.params.file)
  res.attachment(req.params.file)
  res.send(awsResource.Body)
})

router.get('/:id/files/url/:file', async (req, res) => {
  const url = aws.getSignedUrl(req.params.file)
  res.json({ url })
})

router.get('/:id/files', async (req, res) => {
  const list = await aws.list(req.params.id)
  res.json(list)
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
