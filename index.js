const config = require('./config')

const http = require('http')
const app = require('./app')

app.set('port', config.port)

const server = http.createServer(app)
server.listen(config.port)
