const getConfig = (options) => {
  return {
    connectionString: options.connectionString,
    address: options.address
  }
}

module.exports = getConfig
