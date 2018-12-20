const pdfFiller = require('pdffiller')
const uuid = require('uuid')
const fs = require('fs')
const aws = require('./aws')

module.exports = {
  async fillForm (user, form, options) {
    return new Promise((resolve, reject) => {
      var sourcePDF = require.resolve(`../forms/${form}.pdf`)
      var destinationPDF = sourcePDF.replace(`${form}.pdf`, `${form}_${uuid.v4()}.pdf`)

      pdfFiller.fillForm(sourcePDF, destinationPDF, options, function (err) {
        if (err) throw err
        fs.readFile(destinationPDF, (err, data) => {
          if (err) throw new Error('Failed to read pdf file')
          aws.put(user, `${form}.pdf`, data)
            .then(awsKey => {
              fs.unlink(destinationPDF, err => {
                if (err) { console.error(err) }
                console.log(`Temp ${form} Deleted`)
              })
              resolve(awsKey)
            })
        })
      })
    })
  }
}
