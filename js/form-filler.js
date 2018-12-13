const pdfFiller = require('pdffiller')
const uuid = require('uuid')
const fs = require('fs')
const aws = require('./aws')

module.exports = {
  async fillTds (options, user) {
    return new Promise((resolve, reject) => {
      var sourcePDF = require.resolve('../forms/tds.pdf')
      var destinationPDF = sourcePDF.replace('tds.pdf', `tds_${uuid.v4()}.pdf`)

      pdfFiller.fillForm(sourcePDF, destinationPDF, options, function (err) {
        if (err) throw err
        fs.readFile(destinationPDF, (err, data) => {
          if (err) throw new Error('Failed to read pdf file')
          aws.put(user, 'tds.pdf', data)
            .then(awsKey => {
              fs.unlink(destinationPDF, err => {
                if (err) { console.error(err) }
                console.log('Temp TDS Deleted')
              })
              resolve(awsKey)
            })
        })
      })
    })
  }
}
