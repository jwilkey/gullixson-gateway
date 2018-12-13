const AWS = require('aws-sdk')

module.exports = {
  async put (user, identifier, body) {
    const keyName = `${user}-${identifier}`
    var objectParams = { Bucket: process.env.AWS_BUCKET, Key: keyName, Body: body }
    const s3 = new AWS.S3({ apiVersion: '2006-03-01' })
    return s3.putObject(objectParams).promise()
      .then(data => {
        console.log('S3 Upload', data)
        return keyName
      })
  },
  async get (keyName) {
    var objectParams = { Bucket: process.env.AWS_BUCKET, Key: keyName }
    const s3 = new AWS.S3({ apiVersion: '2006-03-01' })
    return s3.getObject(objectParams).promise()
  },
  getSignedUrl (keyName) {
    var params = { Bucket: process.env.AWS_BUCKET, Key: keyName, Expires: 60 }
    const s3 = new AWS.S3({ apiVersion: '2006-03-01' })
    return s3.getSignedUrl('getObject', params)
  },
  async list (user) {
    var params = { Bucket: process.env.AWS_BUCKET, Prefix: user }
    const s3 = new AWS.S3({ apiVersion: '2006-03-01' })
    return s3.listObjects(params).promise()
      .then(data => {
        return data.Contents
      })
  }
}
