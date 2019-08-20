const express = require('express')
const app = express()
const path = require('path')
const router = express.Router()
const nunjucks = require('nunjucks')

nunjucks.configure('views', {
  autoescape: true,
  express: app
})

router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'views/index.html'))
})

router.post('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'views/result.html'))
})

app.use('/', router)

module.exports = app
