var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
const cors = require('cors')
const usersRepository = require('./js/users-repository')

var indexRouter = require('./routes/index')
var sessionRouter = require('./routes/session')
var listingsRouter = require('./routes/listings')
var usersRouter = require('./routes/users')
var realtorsRouter = require('./routes/realtors')
var commentsRouter = require('./routes/comments')
const dbRouter = require('./routes/db')

var app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())

app.use('/', indexRouter)
app.use('/session', sessionRouter)
app.use('/listings', listingsRouter)
app.use('/users', usersRouter)
app.use('/realtors', adminGuard, realtorsRouter)
app.use('/comments', commentsRouter)
app.use('/db', dbRouter)

async function adminGuard (req, res, next) {
  if (await usersRepository.isAdmin(req.headers.token)) {
    next()
  } else {
    res.status(401).send('Access denied')
  }
}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  console.error(err)
  res.status(err.status || 500)
  res.send(err)
})

module.exports = app
