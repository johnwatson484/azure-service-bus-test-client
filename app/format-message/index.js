function formatMessage (format, message) {
  return format === 'json' ? toJson(message) : toString(message)
}

function toJson (message) {
  console.log('sending as JSON')
  return JSON.parse(message)
}

function toString (message) {
  console.log('sending as string')
  return JSON.stringify(JSON.parse(message))
}

module.exports = formatMessage
