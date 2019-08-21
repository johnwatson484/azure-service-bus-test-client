const express = require('express')
const app = express()
const router = express.Router()
const nunjucks = require('nunjucks')
const bodyParser = require('body-parser')

const sendMessage = require('./sendMessage')

nunjucks.configure('views', {
  autoescape: true,
  express: app
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

router.get('/', function (req, res) {
  res.render('index.html')
})

router.post('/', async function (req, res) {
  const connectionString = req.body.connectionString
  const queue = req.body.queue
  const message = req.body.message
  console.log(`preparing to send ${message} to ${queue} queue`)

  const response = await sendMessage(connectionString, queue, message)
  res.send(response)
})

app.use('/', router)

module.exports = app
