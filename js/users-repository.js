const atob = require('atob')

let users = [
  { id: '111', password: 'red', type: 'realtor' },
  { id: '222', password: 'yellow fin', type: 'client' },
  { id: '333', password: 'lark', type: 'client' }
]

module.exports = {
  getUser (password) {
    const pass = atob(password)
    return users.find(u => u.password === pass)
  }
}