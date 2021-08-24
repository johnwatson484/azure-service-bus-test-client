const { MessageSender } = require('../messaging')
const formatMessage = require('./format-message')
const mapTotal = require('../map-total')
const getCorrelationId = require('./get-correlation-id')
const getConfig = require('./get-config')

const sendMessages = async (options) => {
  let sender
  try {
    const mqConfig = getConfig(options)
    const total = mapTotal(options.totalSend)
    sender = new MessageSender('azure-service-bus-test-client', mqConfig)
    for (let i = 1; i <= total; i++) {
      const message = formatMessage(options.format, options.message, i)
      const correlationId = getCorrelationId(options.generateCorrelationId, options.correlationId)
      await sender.sendMessage(message, correlationId)
    }
    return `Sent ${total} messages`
  } catch (err) {
    console.error(err)
    return `Unable to send message: ${err}`
  } finally {
    await sender.closeConnection()
  }
}

module.exports = sendMessages
