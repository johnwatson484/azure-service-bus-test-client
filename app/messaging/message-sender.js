const MessageBase = require('./message-base')

class MessageSender extends MessageBase {
  constructor (name, config) {
    super(name, config)
    this.sendMessage = this.sendMessage.bind(this)
  }

  async sendMessage (message) {
    const sender = this.entityClient.createSender()
    try {
      console.log(`${this.name} sending message`)
      await sender.send({ body: message })
    } catch (error) {
      console.error('failed to send message', error)
      throw error
    } finally {
      await sender.close()
    }
    return message
  }
}

module.exports = MessageSender
