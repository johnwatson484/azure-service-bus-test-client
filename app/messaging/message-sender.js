const MessageBase = require('./message-base')

class MessageSender extends MessageBase {
  constructor (name, config) {
    super(name, config)
    this.sendMessage = this.sendMessage.bind(this)
    this.sender = this.sbClient.createSender(config.address)
  }

  async sendMessage (message, correlationId) {
    try {
      await this.sender.sendMessages({
        body: message,
        correlationId,
      })
    } catch (error) {
      console.error('failed to send message', error)
      throw error
    }
  }

  async closeConnection () {
    await this.sender.close()
    await super.closeConnection()
  }
}

module.exports = MessageSender
