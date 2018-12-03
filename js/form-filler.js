var pdfFiller = require('pdffiller')

module.exports = {
  async fillTds (options) {
    return new Promise((resolve, reject) => {
      var sourcePDF = '../forms/tds.pdf'
      var nameRegex = null

      var template = pdfFiller.generateFDFTemplate(sourcePDF, nameRegex, (err, fdfData) => {
        if (err) throw err
        console.log(fdfData)
        resolve('../forms/tds.pdf')
      })
    })
  }
}
