const { ServiceBusClient } = require('@azure/service-bus')

class MessageBase {
  constructor (name, config) {
    this.name = name
    this.config = config
    this.sbClient = new ServiceBusClient(config.connectionString)
  }

  async closeConnection () {
    await this.sbClient.close()
    console.log(`${this.name} connection closed`)
  }
}

module.exports = MessageBase
