const { v4: uuidv4 } = require('uuid')

const getCorrelationId = (generateCorrelationId, correlationId) => {
  return generateCorrelationId ? uuidv4() : correlationId
}

module.exports = getCorrelationId
