var express = require('express')
var router = express.Router()
const commentsRepository = require('../js/comments-repository')

router.get('/:userId', async (req, res) => {
  const comments = await commentsRepository.getComments(req.params.userId)
  res.json(comments)
})

router.post('/', async (req, res) => {
  const comment = await commentsRepository.createComment(req.body)
  res.json(comment)
})

router.delete('/:commentId', async (req, res) => {
  await commentsRepository.deleteComment(req.params.commentId)
  res.json({ success: true })
})

module.exports = router
