var express = require('express')
var router = express.Router()
const atob = require('atob')

router.post('/', (req, res) => {
  const password = atob(req.body.password)
  console.log(password)
  if (password === 'red') {
    res.json({ id: '111', type: 'realtor' })
  } else if (password === 'yellow fin') {
    res.json({ id: '222', type: 'client' })
  } else if (password === 'lark') {
    res.json({ id: '333', type: 'client' })
  } else {
    res.status(401).send('Unauthorized')
  }
})

module.exports = router