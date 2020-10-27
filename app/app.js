const express = require('express')
const app = express()
const router = express.Router()
const nunjucks = require('nunjucks')
const bodyParser = require('body-parser')
const favicon = require('serve-favicon')
const { check, validationResult } = require('express-validator')
const { MessageSender } = require('./messaging')
const formatMessage = require('./format-message')

nunjucks.configure('./app/views', {
  autoescape: true,
  express: app
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(favicon('./app/favicon.ico'))

router.get('/', function (req, res) {
  res.render('index.njk')
})

router.post('/', [
  check('connectionString')
    .contains('Endpoint=sb://')
    .withMessage('Connection string Endpoint missing')
    .contains(';SharedAccessKeyName=')
    .withMessage('Connection string SharedAccessKeyName missing')
    .contains(';SharedAccessKey=')
    .withMessage('Connection string SharedAccessKey missing')
    .trim(),
  check('queue').isLength({ min: 1 })
    .withMessage('Invalid queue')
    .trim(),
  check('message')
    .isJSON()
    .withMessage('Invalid JSON message')
    .trim()
], async function (req, res) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.send(errors.array().map(x => `<p>${x.msg}</p>`))
  }

  let response

  try {
    const message = formatMessage(req.body.format, req.body.message)
    const config = {
      connectionString: req.body.connectionString,
      address: req.body.queue,
      type: req.body.entity
    }
    const queueSender = new MessageSender('azure-service-bus-test-client', config)
    await queueSender.sendMessage(message)
    await queueSender.closeConnection()
    response = 'Message sent'
  } catch (err) {
    response = `Unable to send message: ${err}`
    console.error(response)
  }
  res.send(response)
})

app.use('/', router)

module.exports = app
