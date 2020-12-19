const express = require('express')
const app = express()
const router = express.Router()
const nunjucks = require('nunjucks')
const bodyParser = require('body-parser')
const favicon = require('serve-favicon')
const { check, validationResult } = require('express-validator')
const { MessageSender, MessageReceiver } = require('./messaging')
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

const validateTotal = (total) => {
  if (!total) {
    return 0
  }
  if (total < 0) {
    return 0
  }
  return Number(total)
}

router.post('/send', [
  check('connectionString')
    .contains('Endpoint=sb://')
    .withMessage('Connection string Endpoint missing')
    .contains(';SharedAccessKeyName=')
    .withMessage('Connection string SharedAccessKeyName missing')
    .contains(';SharedAccessKey=')
    .withMessage('Connection string SharedAccessKey missing')
    .trim(),
  check('address').isLength({ min: 1 })
    .withMessage('Invalid queue/topic')
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
      address: req.body.address
    }
    const total = validateTotal(req.body.totalReceive)
    const sender = new MessageSender('azure-service-bus-test-client', config)
    for (let i = 0; i < total; i++) {
      await sender.sendMessage(message)
    }
    await sender.closeConnection()
    response = 'Message sent'
  } catch (err) {
    response = `Unable to send message: ${err}`
    console.error(response)
  }
  res.send(response)
})

router.post('/receive', async function (req, res) {
  let messages
  let receiver

  try {
    const config = {
      connectionString: req.body.connectionString,
      address: req.body.address,
      subscription: req.body.subscription
    }
    const total = validateTotal(req.body.totalReceive)
    receiver = new MessageReceiver('azure-service-bus-test-client', config)
    messages = await receiver.peakMessages(total)
    messages = messages.map(x => x.body)
  } catch (err) {
    console.error(err)
  } finally {
    await receiver.closeConnection()
  }
  res.send({ messages })
})

app.use('/', router)

module.exports = app
