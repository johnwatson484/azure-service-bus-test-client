const rheaPromise = require('rhea-promise')

module.exports = async function send (connectionString, queue, message) {
  console.log(`preparing to send ${message} to ${queue} queue`)
  let connectionOptions = {}

  try {
    connectionOptions = parseConnectionString(connectionString)
  } catch (err) {
    console.error('unable to parse connection string', err)
    return 'Unable to parse connection string'
  }

  const connection = new rheaPromise.Connection(connectionOptions)
  const senderOptions = configureSender(queue)

  try {
    console.log(`sending message ${message}`)
    await connection.open()
    const sender = await connection.createAwaitableSender(senderOptions)
    await sender.send({ body: message })
    await sender.close()
    await connection.close()
    console.log('message sent')
  } catch (err) {
    console.error('unable to send message', err)
    return JSON.stringify(err)
  }
  return 'Message sent'
}

function configureSender (address) {
  return {
    name: 'azure-service-bus-test-client',
    target: {
      address
    },
    sendTimeoutInSeconds: 10,
    onError: (context) => {
      const senderError = context.sender && context.sender.error
      if (senderError) {
        console.error('unable to send message', senderError)
      }
    },
    onSessionError: (context) => {
      const sessionError = context.session && context.session.error
      if (sessionError) {
        console.error('session error', sessionError)
      }
    }
  }
}

function parseConnectionString (connectionString) {
  const hostFlag = 'Endpoint=sb://'
  const hostFlagLocation = connectionString.indexOf(hostFlag)
  const sharedAccessKeyNameFlag = ';SharedAccessKeyName='
  const sharedAccessKeyNameFlagLocation = connectionString.indexOf(sharedAccessKeyNameFlag)
  const sharedAccessKeyFlag = ';SharedAccessKey='
  const sharedAccessKeyFlagLocation = connectionString.indexOf(sharedAccessKeyFlag)
  const entityPathFlag = ';EntityPath='
  const entityPathLocation = connectionString.indexOf(entityPathFlag)
  const host = connectionString.substring(hostFlagLocation + hostFlag.length, sharedAccessKeyNameFlagLocation).replace('/', '')
  const sharedAccessKeyName = connectionString.substring(sharedAccessKeyNameFlagLocation + sharedAccessKeyNameFlag.length, sharedAccessKeyFlagLocation)
  const SharedAccessKey = connectionString.substring(sharedAccessKeyFlagLocation + sharedAccessKeyFlag.length, entityPathLocation > -1 ? entityPathLocation : connectionString.length)

  const connectionOptions = {
    transport: 'ssl',
    host: host,
    hostname: host,
    username: sharedAccessKeyName,
    password: SharedAccessKey,
    port: 5671,
    reconnect: false
  }
  console.log('connection string parsed')
  return connectionOptions
}
