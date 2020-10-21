const { ServiceBusClient } = require('@azure/service-bus')

class MessageBase {
  constructor (name, config) {
    this.name = name
    this.sbClient = ServiceBusClient.createFromConnectionString(config.connectionString)
    this.entityClient = this.createEntityClient(config)
  }

  createEntityClient (config) {
    switch (config.type) {
      case 'queue':
        return this.sbClient.createQueueClient(config.address)
      case 'topic':
        return this.sbClient.createTopicClient(config.address)
      case 'subscription':
        return this.sbClient.createSubscriptionClient(config.topic, config.address)
    }
  }

  async closeConnection () {
    await this.entityClient.close()
    await this.sbClient.close()
    console.log(`${this.name} connection closed`)
  }
}

module.exports = MessageBase
