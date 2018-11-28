var express = require('express')
var router = express.Router()
const usersRepository = require('../js/users-repository')

router.post('/', (req, res) => {
  const user = usersRepository.getUser(req.body.password)
  user !== undefined
    ? res.json(user)
    : res.status(401).send('Unauthorized')
})

module.exports = router