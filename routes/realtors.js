var express = require('express')
var router = express.Router()
const usersRepository = require('../js/users-repository')

router.get('/clients', async (req, res) => {
  const clients = await usersRepository.getClients()
  res.json(clients)
})

router.post('/clients/:id', async (req, res) => {
  const user = await usersRepository.updateUser(req.params.id, req.body)
  res.json(user)
})

router.delete('/clients/:id', async (req, res) => {
  await usersRepository.deleteUser(req.params.id)
  res.json({ deleted: true })
})

module.exports = router
