const formatMessage = (format, message, id) => {
  message = replacePlaceholders(message, id)
  return format === 'json' ? JSON.parse(message) : message;
}

const replacePlaceholders = (message, id) => {
  return message.replace(/##/g, id)
}

module.exports = formatMessage
