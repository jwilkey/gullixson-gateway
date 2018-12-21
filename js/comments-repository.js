const database = require('./database')

module.exports = {
  async getComments (userId) {
    return database.query(`SELECT * FROM comments WHERE userId = ${userId}`)
  },
  async createComment (comment) {
    const author = comment.authorId || comment.userId
    const message = database.safeString(comment.message)
    const tagsJson = !comment.tags ? null : JSON.stringify(comment.tags)
    const query = `
      INSERT INTO comments (userId, authorId, tags, message) VALUES (
        '${comment.userId}', '${author}', '${tagsJson}', '${message}'
      ) RETURNING *;`
    const rows = await database.query(query)
    return rows[0]
  },
  async deleteComment (commentId) {
    return database.query(`DELETE FROM comments WHERE id = ${commentId}`)
  }
}
