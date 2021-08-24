const clearQueue = async (receiver, batchSize = 100, maxWaitTimeInMs = 1000) => {
  let messages
  do {
    messages = await receiver.receiveMessages(batchSize, { maxWaitTimeInMs })
  } while (messages.length > 0 && messages.length === batchSize)
}

module.exports = clearQueue
