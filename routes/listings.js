var express = require('express')
var router = express.Router()

router.get('/', (req, res) => {
  res.json(listings)
})

module.exports = router

const listings = [
  {"title": "600 Moore Road, Woodside", "price": "Coming Soon", "image": "url('https://gullixson.com/gutensite/v/1.0/content/property/images/no_photo.png')"},
  {"title": "69 Tuscaloosa Avenue, Atherton", "price": "$26,000,000", "image": "url('https://d21a68f62dce04c36cc0-07f97628d73b4acaef8aebcdd559ff08.ssl.cf1.rackcdn.com/1598977-full.jpg')"},
  {"title": "333 Fletcher Drive, Atherton", "price": "$10,288,888", "image": "url('https://d21a68f62dce04c36cc0-07f97628d73b4acaef8aebcdd559ff08.ssl.cf1.rackcdn.com/1585238-full.jpg')"},
  {"title": "96 Ridge View Drive, Atherton", "price": "$27,800,000", "image": "url('https://d21a68f62dce04c36cc0-07f97628d73b4acaef8aebcdd559ff08.ssl.cf1.rackcdn.com/1221254-full.jpg')"},
  {"title": "Atherton,", "price": "Off Market", "image": "url('https://d21a68f62dce04c36cc0-07f97628d73b4acaef8aebcdd559ff08.ssl.cf1.rackcdn.com/1581222-full.jpg')"},
  {"title": "200 Polhemus Avenue, Atherton", "price": "$36,000,000", "image": "url('https://d21a68f62dce04c36cc0-07f97628d73b4acaef8aebcdd559ff08.ssl.cf1.rackcdn.com/1576597-full.jpg')"},
  {"title": "385 Fletcher Drive, Atherton", "price": "$14,900,000", "image": "url('https://d21a68f62dce04c36cc0-07f97628d73b4acaef8aebcdd559ff08.ssl.cf1.rackcdn.com/1572006-full.jpg')"},
  {"title": "1437 Hamilton Ave, Palo Alto", "price": "$6,980,000", "image": "url('https://d21a68f62dce04c36cc0-07f97628d73b4acaef8aebcdd559ff08.ssl.cf1.rackcdn.com/1565537-full.jpg')"},
  {"title": "7 Faxon Forest, Atherton", "price": "Off Market", "image": "url('https://d21a68f62dce04c36cc0-07f97628d73b4acaef8aebcdd559ff08.ssl.cf1.rackcdn.com/1563842-full.jpg')"},
  {"title": "Chez Ami, Atherton", "price": "$17,500,000", "image": "url('https://d21a68f62dce04c36cc0-07f97628d73b4acaef8aebcdd559ff08.ssl.cf1.rackcdn.com/1503338-full.jpg')"},
  {"title": "100 Alamos Drive, Portola Valley", "price": "$4,900,000", "image": "url('https://d21a68f62dce04c36cc0-07f97628d73b4acaef8aebcdd559ff08.ssl.cf1.rackcdn.com/1499780-full.jpg')"},
  {"title": "390 Stevick Drive, Atherton", "price": "$13,380,000", "image": "url('https://d21a68f62dce04c36cc0-07f97628d73b4acaef8aebcdd559ff08.ssl.cf1.rackcdn.com/1328255-full.jpg')"},
  {"title": "80 Roberta Drive, Woodside", "price": "$9,995,000", "image": "url('https://d21a68f62dce04c36cc0-07f97628d73b4acaef8aebcdd559ff08.ssl.cf1.rackcdn.com/1538969-full.jpg')"},
  {"title": "122 Lakeview Drive, Woodside", "price": "$12,500,000", "image": "url('https://d21a68f62dce04c36cc0-07f97628d73b4acaef8aebcdd559ff08.ssl.cf1.rackcdn.com/1538966-full.jpg')"}
]