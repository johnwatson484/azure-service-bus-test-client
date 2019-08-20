const { ServiceBusClient, ReceiveMode } = require('@azure/service-bus')

// Define connection string and related Service Bus entity names here
const connectionString = ''
const queueName = ''

async function main () {
  const sbClient = ServiceBusClient.createFromConnectionString(connectionString)
  const queueClient = sbClient.createQueueClient(queueName)
  const receiver = queueClient.createReceiver(ReceiveMode.ReceiveAndDelete)
  try {
    const messages = await receiver.receiveMessages(10)
    console.log('Received messages:')
    console.log(messages.map(message => message.body))

    await queueClient.close()
  } finally {
    await sbClient.close()
  }
}

main().catch((err) => {
  console.log('Error occurred: ', err)
})
