var express = require('express')
var router = express.Router()
const appointmentsRepository = require('../js/appointments-repository')
const usersRepository = require('../js/users-repository')
const formFiller = require('../js/form-filler')
const aws = require('../js/aws')
const emailer = require('../js/emailer')

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
  const userId = req.params.id
  const appointment = await appointmentsRepository.createAppointment(userId, req.body)
  emailer.appointmentNotification(userId, appointment)
  res.json({ success: true })
})

router.get('/:id/state/:key', async (req, res) => {
  const state = await usersRepository.getUserState(req.params.id, req.params.key)
  res.json(state)
})

router.delete('/:id/state/:key', async (req, res) => {
  const state = await usersRepository.deleteUserState(req.params.id, req.params.key)
  res.json(state)
})

router.post('/:id/state', async (req, res) => {
  await usersRepository.saveUserState(req.params.id, req.body.key, req.body.value)
  res.json({ success: true })
})

router.get('/forms/ssc', async (req, res) => {
  const fdf = await formFiller.getTemplate('ssc')
  res.json(fdf)
})

router.post('/:id/forms/:form', async (req, res) => {
  const userId = req.params.id
  const form = req.params.form
  const file = await formFiller.fillForm(userId, form, req.body)
  emailer.formNotification(userId, form)
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

router.patch('/:id/appointments', async (req, res) => {
  const userId = req.params.id
  const updated = await appointmentsRepository.updateAppointment(req.body)
  emailer.appointmentNotification(userId, updated)
  res.json(updated)
})

router.delete('/appointments', async (req, res) => {
  await appointmentsRepository.deleteAppointment(req.body)
  res.json({ success: true })
})

module.exports = router
