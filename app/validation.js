const { check } = require('express-validator')

const validateConnectionString = [
  check('connectionString')
    .contains('Endpoint=sb://')
    .withMessage('Connection string Endpoint missing')
    .contains(';SharedAccessKeyName=')
    .withMessage('Connection string SharedAccessKeyName missing')
    .contains(';SharedAccessKey=')
    .withMessage('Connection string SharedAccessKey missing')
    .trim(),
]

const validateAddress = [
  check('address').isLength({ min: 1 })
    .withMessage('Invalid queue/topic')
    .trim(),
]

const validateMessage = [
  check('message')
    // First trim the message
    .trim()
    // Only apply JSON validation if format is 'json'
    .if((value, { req }) => req.body.format === 'json')
    // Then check if it's valid JSON
    .custom((value) => {
      try {
        JSON.parse(value)
        return true
      } catch {
        return false
      }
    })
    .withMessage('Invalid JSON message'),
]

const validateSend = [].concat(validateConnectionString, validateAddress, validateMessage)
const validateReceive = [].concat(validateConnectionString, validateAddress)

module.exports = {
  validateSend,
  validateReceive,
}
