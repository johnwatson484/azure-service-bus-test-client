const { ReceiveMode } = require('@azure/service-bus')
const MessageBase = require('./message-base')

class MessageReceiver extends MessageBase {
  constructor (name, config, action) {
    super(name, config)
    this.receiverHandler = this.receiverHandler.bind(this)
    this.action = action
    this.receiver = this.entityClient.createReceiver(ReceiveMode.peekLock)
    this.receiver.registerMessageHandler(this.receiverHandler, this.receiverError)
  }

  receiverError (error) {
    console.error(error)
  }

  async receiverHandler (message) {
    console.log(`${this.name} received message`)
    try {
      await this.action(message)
    } catch (ex) {
      console.error(`${this.name} error with message`, ex)
    }
  }

  async closeConnection () {
    await this.receiver.close()
    await super.closeConnection()
  }
}

module.exports = MessageReceiver
