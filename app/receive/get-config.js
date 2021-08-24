const getConfig = (options) => {
  return {
    connectionString: options.connectionString,
    address: options.address,
    subscription: options.subscription,
    options: {
      subQueueType: options.fromDeadLetter ? 'deadLetter' : undefined,
      receiveMode: options.method !== 'peek' ? 'receiveAndDelete' : undefined
    }
  }
}

module.exports = getConfig
