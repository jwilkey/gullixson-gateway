var express = require('express')
var router = express.Router()
const request = require('request')

router.get('/', (req, res) => {
  const listingsUrl = 'https://www.gullixson.com/ajax/request?class=property.api&api=/Properties/search'
  const searchOptions = {
    'filter': {
      'where': { 'ListingType': ['House', 'Condo'], 'Status': { 'inq': ['Active', 'Contract'] } },
      'fields': ['_id', '_Class', 'MlsStatus', 'PropertyType', 'PropertySubType', 'UnparsedAddress', 'StreetNumberNumeric', 'StreetName', 'StreetSuffix', 'UnitNumber', 'City', 'CountyOrParish', 'StateOrProvince', 'ListPrice', 'ClosePrice', 'ListingId', 'ListingKey', 'BathroomsFull', 'BathroomsHalf', 'PublicRemarks', 'BedroomsTotal'],
      'limit': 20,
      'skip': 0,
      'include': { 'relation': 'Images', 'scope': { 'order': 'Order', 'fields': ['MediaURL'] } },
      'count': true }
  }

  request({
    url: listingsUrl,
    method: 'POST',
    json: searchOptions
  }, (error, response, body) => {
    if (error) res.send('Error fetching listings')
    else {
      res.send(body)
    }
  })
})

module.exports = router
