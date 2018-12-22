var express = require('express')
var router = express.Router()
const emailer = require('../js/emailer')

router.get('/', (req, res, next) => {
  res.send('Gullixson API')
})

module.exports = router
