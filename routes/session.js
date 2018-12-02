var express = require('express')
var router = express.Router()
const usersRepository = require('../js/users-repository')

router.post('/', async (req, res) => {
  const user = await usersRepository.getUser(req.body.email, req.body.password)
  user !== undefined
    ? res.json(user)
    : res.status(401).send('Unauthorized')
})

module.exports = router
