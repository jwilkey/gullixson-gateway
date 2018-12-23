const email = require('emailjs')
const usersRepository = require('./users-repository')
const moment = require('moment')

const send = async (emailAddress, subject, message) => {
  const user = process.env.EMAIL_USER
  const password = process.env.EMAIL_PASSWORD
  const host = process.env.EMAIL_SERVER
  const to = `Gullixson App User <${emailAddress}>`

  var server = email.server.connect({
    user,
    password,
    host,
    ssl: true
  })

  return new Promise((resolve, reject) => {
    server.send({
      text: message,
      from: 'Gullixson App <app@gullixson.com>',
      to,
      subject
    }, (err, m) => {
      if (err) {
        console.error(err)
        reject(err)
      } else {
        resolve(m)
      }
    })
  })
}

module.exports = {
  async appointmentNotification (userId, appointment) {
    const email = await usersRepository.getEmail(userId)
    if (!email) { throw new Error('Email not found') }
    const date = moment(appointment.date, 'YYYY-MM-DD').format('MMM Do')
    const time = moment(appointment.time, 'H:mm').format('hh:mm A')
    const label = appointment.label ? ` (${appointment.label})` : ''
    return send(email,
      `Appointment ${appointment.status}: ${date}`,
      `An appointment${label} at your property is ${appointment.status} for ${date} at ${time}. You may login to the Gullixson App to review this appointment.`)
  },
  async formNotification (userId, form) {
    const email = await usersRepository.getEmail(userId)
    if (!email) { throw new Error('Email not found') }
    return send(email,
      `Form completed: ${form.toUpperCase()}`,
      `You have completed the ${form.toUpperCase()} form. It is now available for review in the Gullixson app.`)
  },
  async commentNotification (comment) {
    const email = await usersRepository.getEmail(comment.userid)
    if (!email) { throw new Error('Email not found') }
    return send(email,
      `New message in the Gullixson App`,
      `You have a new message in the Gullixson app. "${comment.message}"`)
  },
  send
}