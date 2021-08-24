const MessageBase = require('./message-base')

class MessageReceiver extends MessageBase {
  constructor (name, config) {
    super(name, config)
    this.receiver = config.subscription ? this.sbClient.createReceiver(config.address, config.subscription, config.options) : this.sbClient.createReceiver(config.address, config.options)
  }

  async peakMessages (maxMessageCount, options = {}) {
    return this.receiver.peekMessages(maxMessageCount, options)
  }

  async receiveMessages (maxMessageCount, options = { maxWaitTimeInMs: 5000 }) {
    return this.receiver.receiveMessages(maxMessageCount, options)
  }

  async completeMessage (message) {
    await this.receiver.completeMessage(message)
  }

  async closeConnection () {
    await this.receiver.close()
    await super.closeConnection()
  }
}

module.exports = MessageReceiver
