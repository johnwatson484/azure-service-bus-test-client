const { validationResult } = require('express-validator')
const sendMessages = require('./send-messages')

const send = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.send(errors.array().map(x => `<p>${x.msg}</p>`))
  }
  // update session
  req.session.body = req.body
  const result = await sendMessages(req.body)
  res.send(result)
}

module.exports = send
