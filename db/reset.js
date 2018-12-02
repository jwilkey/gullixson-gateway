const database = require('../js/database')

const query = `
  DROP TABLE IF EXISTS usersAppointments; 
  DROP TABLE IF EXISTS appointments; 
  DROP TABLE IF EXISTS users; 
  DROP TABLE IF EXISTS migrations;
`
database.query(query)
  .then(res => {
    console.log(res)
  })
