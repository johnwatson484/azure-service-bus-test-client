const { MessageReceiver } = require('../messaging')
const mapTotal = require('../map-total')
const getConfig = require('./get-config')
const clearQueue = require('./clear-queue')

const receiveMessages = async (options) => {
  let messages = []
  let receiver

  try {
    const mqConfig = getConfig(options)
    const total = mapTotal(options.totalReceive)
    receiver = new MessageReceiver('azure-service-bus-test-client', mqConfig)
    switch (options.method) {
      case 'complete':
        messages = await receiver.receiveMessages(total)
        break
      case 'peek':
        messages = await receiver.peakMessages(total)
        break
      case 'clear':
        await clearQueue(receiver)
        break
      default:
        break
    }
    return messages.map(x => x.body)
  } catch (err) {
    console.error(err)
  } finally {
    await receiver.closeConnection()
  }
}

module.exports = receiveMessages
