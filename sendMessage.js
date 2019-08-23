const { ServiceBusClient } = require('@azure/service-bus')

module.exports = async function send (connectionString, queueName, messageBody) {
  console.log(`preparing to send ${messageBody} to ${queueName} queue`)

  const sbClient = ServiceBusClient.createFromConnectionString(connectionString)
  const queueClient = sbClient.createQueueClient(queueName)
  const sender = queueClient.createSender()
  let response = 'Unknown'

  try {
    console.log(`sending message ${messageBody}`)
    await sender.send({ body: messageBody })
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
