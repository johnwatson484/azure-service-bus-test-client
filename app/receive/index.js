const { validationResult } = require('express-validator')
const receiveMessages = require('./receive-messages')

const receive = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.send({ errors: errors.array().map(x => x.msg) })
  }
  // update session
  req.session.body = req.body
  const messages = await receiveMessages(req.body)
  res.send({ messages })
}

module.exports = receive
