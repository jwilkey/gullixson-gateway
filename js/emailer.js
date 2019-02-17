const email = require('emailjs')
const usersRepository = require('./users-repository')
const aws = require('./aws')
const moment = require('moment')
const adminEmail = process.env.EMAIL_ADMIN_ADDRESS

const send = async (emailAddress, subject, message, attachment) => {
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
      from: `Gullixson App <${process.env.EMAIL_FROM_ADDRESS}>`,
      to,
      subject,
      attachment
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
  async shareFile (userId, emailTo, awsKey) {
    const emailFrom = await usersRepository.getName(userId)
    const file = await aws.get(awsKey)
    const fileString = file.Body.toString('base64')

    const attachments = [{
      data: fileString, name: awsKey, type: 'application/pdf', encoded: true
    }]
    return send(emailTo,
      `A file has been shared with you`,
      `${emailFrom} has shared the attached file with you.`,
      attachments)
  },
  async appointmentNotification (userId, appointment) {
    const emailAddress = await usersRepository.getEmail(userId)
    if (!emailAddress) { throw new Error('Email not found') }
    const date = moment(appointment.date, 'YYYY-MM-DD').format('MMM Do')
    const time = moment(appointment.time, 'H:mm').format('hh:mm A')
    const label = appointment.label ? ` (${appointment.label})` : ''
    return send(emailAddress,
      `Appointment ${appointment.status}: ${date}`,
      `An appointment${label} at your property is ${appointment.status} for ${date} at ${time}. You may login to the Gullixson App to review this appointment.`)
  },
  async formNotification (userId, form) {
    const emailAddress = await usersRepository.getEmail(userId)
    if (!emailAddress) { throw new Error('Email not found') }
    const name = await usersRepository.getName(userId)
    send(adminEmail,
      `${form.toUpperCase()} completed by ${name}`,
      `${name} has completed the ${form.toUpperCase()} form. It is now available for review in the Gullixson app.`)
    return send(emailAddress,
      `Form completed: ${form.toUpperCase()}`,
      `You have completed the ${form.toUpperCase()} form. It is now available for review in the Gullixson app.`)
  },
  async commentNotification (comment) {
    if (comment.userid === comment.authorid) {
      const name = await usersRepository.getName(comment.userid)
      return send(adminEmail,
        `New comment from ${name}`,
        `There is a new comment in the Gullixson app from ${name}. "${comment.message}"`)
    } else {
      const emailAddress = await usersRepository.getEmail(comment.userid)
      if (!emailAddress) { throw new Error('Email not found') }
      return send(emailAddress,
        `New message in the Gullixson App`,
        `You have a new message in the Gullixson app. "${comment.message}"`)
    }
  },
  send
}
