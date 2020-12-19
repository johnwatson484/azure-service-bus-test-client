const MessageBase = require('./message-base')

class MessageReceiver extends MessageBase {
  constructor (name, config, action) {
    super(name, config)
    this.receiverHandler = this.receiverHandler.bind(this)
    this.action = action
    this.receiver = config.type === 'subscription' ? this.sbClient.createReceiver(config.topic, config.address) : this.sbClient.createReceiver(config.address)
    this.receiver.subscribe({
      processMessage: this.receiverHandler,
      processError: async (args) => {
        this.receiverError(args.error)
      }
    })
  }

  receiverError (error) {
    console.error(error)
  }

  async receiverHandler (message) {
    console.log(`${this.name} received message`)
    try {
      await this.action(message)
      await this.receiver.completeMessage(message)
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
