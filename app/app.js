const express = require('express')
const app = express()
const router = express.Router()
const nunjucks = require('nunjucks')
const bodyParser = require('body-parser')
const favicon = require('serve-favicon')
const cookieSession = require('cookie-session')
const { validationResult } = require('express-validator')
const { MessageSender, MessageReceiver } = require('./messaging')
const formatMessage = require('./format-message')
const mapTotal = require('./map-total')
const { validateSend, validateReceive } = require('./validation')
const config = require('./config')

nunjucks.configure('./app/views', {
  autoescape: true,
  express: app
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieSession(config.cookie))

app.use(favicon('./app/favicon.ico'))

router.get('/', function (req, res) {
  const { session: { body } } = req
  res.render('index.njk', { body })
})

router.post('/send', validateSend, async function (req, res) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.send(errors.array().map(x => `<p>${x.msg}</p>`))
  }

  req.session.body = req.body

  let response

  try {
    const config = {
      connectionString: req.body.connectionString,
      address: req.body.address
    }
    const total = mapTotal(req.body.totalSend)
    const sender = new MessageSender('azure-service-bus-test-client', config)
    for (let i = 0; i < total; i++) {
      const message = formatMessage(req.body.format, req.body.message, i + 1)
      await sender.sendMessage(message)
    }
    await sender.closeConnection()
    response = `Sent ${total} messages`
    console.log(response)
  } catch (err) {
    response = `Unable to send message: ${err}`
    console.error(response)
  }
  res.send(response)
})

router.post('/receive', validateReceive, async function (req, res) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.send({ errors: errors.array().map(x => x.msg) })
  }

  req.session.body = req.body

  let messages
  let receiver

  try {
    const config = {
      connectionString: req.body.connectionString,
      address: req.body.address,
      subscription: req.body.subscription
    }
    const total = mapTotal(req.body.totalReceive)
    receiver = new MessageReceiver('azure-service-bus-test-client', config)
    if (req.body.complete === 'true') {
      messages = await receiver.receiveMessages(total)
      for (const message of messages) {
        await receiver.completeMessage(message)
      }
    } else {
      messages = await receiver.peakMessages(total)
    }
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
