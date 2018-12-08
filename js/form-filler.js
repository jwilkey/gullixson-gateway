var pdfFiller = require('pdffiller')

module.exports = {
  async fillTds (options) {
    return new Promise((resolve, reject) => {
      var sourcePDF = require.resolve('../forms/tds.pdf')
      var destinationPDF = sourcePDF.replace('tds.pdf', 'tds_filled.pdf')

      pdfFiller.fillForm(sourcePDF, destinationPDF, options, function (err) {
        if (err) throw err
        resolve(destinationPDF)
      })
    })
  }
}
