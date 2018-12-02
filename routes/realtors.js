var express = require('express')
var router = express.Router()
const usersRepository = require('../js/users-repository')

router.get('/clients', async (req, res) => {
  const clients = await usersRepository.getClients()
  res.json(clients)
})

module.exports = router
