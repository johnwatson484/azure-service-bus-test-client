const rheaPromise = require('rhea-promise')

module.exports = async function send (connectionString, queue, message) {
  console.log(`preparing to send ${message} to ${queue} queue`)
  let connectionOptions = {}

  try {
    const hostFlag = 'Endpoint=sb://'
    const hostFlagLocation = connectionString.indexOf(hostFlag)
    const sharedAccessKeyNameFlag = ';SharedAccessKeyName='
    const sharedAccessKeyNameFlagLocation = connectionString.indexOf(sharedAccessKeyNameFlag)
    const sharedAccessKeyFlag = ';SharedAccessKey='
    const sharedAccessKeyFlagLocation = connectionString.indexOf(sharedAccessKeyFlag)

    const host = connectionString.substring(hostFlagLocation + hostFlag.length, sharedAccessKeyNameFlagLocation).replace('/', '')
    const sharedAccessKeyName = connectionString.substring(sharedAccessKeyNameFlagLocation + sharedAccessKeyNameFlag.length, sharedAccessKeyFlagLocation)
    const SharedAccessKey = connectionString.substring(sharedAccessKeyFlagLocation + sharedAccessKeyFlag.length, connectionString.length)

    connectionOptions = {
      transport: 'ssl',
      host: host,
      hostname: host,
      username: sharedAccessKeyName,
      password: SharedAccessKey,
      port: 5671,
      reconnect: false
    }
    console.log('connection string parsed')
  } catch (err) {
    console.log('unable to parse connection string', err)
    return 'Unable to parse connection string'
  }

  const connection = new rheaPromise.Connection(connectionOptions)

  const senderOptions = {
    name: 'azure-service-bus-test-client',
    target: {
      address: queue
    },
    onError: (context) => {
      const senderError = context.sender && context.sender.error
      if (senderError) {
        console.log('unable to send message', senderError)
      }
    },
    onSessionError: (context) => {
      const sessionError = context.session && context.session.error
      if (sessionError) {
        console.log('session error', sessionError)
      }
    }
  }
  console.log('connection configured')

  await connection.open()
  console.log('connection open')
  const sender = await connection.createSender(senderOptions)
  console.log(`sending message ${message}`)
  await sender.send(message)
  console.log('message sent')
  await sender.close()
  await connection.close()
  console.log('connection closed')

  return 'Message sent'
}
