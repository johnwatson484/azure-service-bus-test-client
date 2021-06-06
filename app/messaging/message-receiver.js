const MessageBase = require('./message-base')

class MessageReceiver extends MessageBase {
  constructor (name, config) {
    super(name, config)
    this.receiver = config.subscription ? this.sbClient.createReceiver(config.address, config.subscription, config.options) : this.sbClient.createReceiver(config.address, config.options)
  }

  async peakMessages (maxMessageCount) {
    return await this.receiver.peekMessages(maxMessageCount)
  }

  async receiveMessages (maxMessageCount) {
    return await this.receiver.receiveMessages(maxMessageCount, { maxWaitTimeInMs: 500, maxTimeAfterFirstMessageInMs: 10000 })
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
