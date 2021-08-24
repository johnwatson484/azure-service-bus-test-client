const formatMessage = (format, message, id) => {
  message = replacePlaceholders(message, id)
  return format === 'json' ? toJson(message) : toString(message)
}

const toJson = (message) => {
  return JSON.parse(message)
}

const toString = (message) => {
  return JSON.stringify(JSON.parse(message))
}

const replacePlaceholders = (message, id) => {
  return message.replace(/##/g, id)
}

module.exports = formatMessage
