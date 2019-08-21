const { ServiceBusClient } = require('@azure/service-bus')

module.exports = async function send (connectionString, queueName, messageBody) {
  const sbClient = ServiceBusClient.createFromConnectionString(connectionString)
  const queueClient = sbClient.createQueueClient(queueName)
  const sender = queueClient.createSender()
  let response = 'Unknown'

  try {
    const message = {
      body: messageBody,
      label: `test-client`
    }
    console.log(`sending message: ${message.body}`)
    await sender.send(message)
    console.log('message sent')
    await queueClient.close()
    response = 'Message sent'
  } catch (err) {
    console.log(err)
    response = JSON.stringify(err)
  } finally {
    await sbClient.close()
  }

  return response
}
