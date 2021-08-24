const express = require('express')
const app = express()
const router = express.Router()
const nunjucks = require('nunjucks')
const bodyParser = require('body-parser')
const favicon = require('serve-favicon')
const cookieSession = require('cookie-session')
const { validateSend, validateReceive } = require('./validation')
const config = require('./config')
const receive = require('./receive')
const send = require('./send')
const home = require('./home')

nunjucks.configure('./app/views', {
  autoescape: true,
  express: app
})

app.disable('x-powered-by')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieSession(config.cookie))
app.use(favicon('./app/favicon.ico'))

router.get('/', home)
router.post('/send', validateSend, send)
router.post('/receive', validateReceive, receive)

app.use('/', router)

module.exports = app
