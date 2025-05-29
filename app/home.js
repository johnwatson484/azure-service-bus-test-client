const config = require('./config')

const home = async (req, res) => {
  const { session } = req

  // Initialize session.body if it doesn't exist
  if (!session.body) {
    session.body = {
      connectionString: config.defaults.connectionString,
      address: config.defaults.queueOrTopicName, // Maps to the 'address' field in the form
      subscription: config.defaults.subscriptionName,
    }
  }

  res.render('home.njk', { body: session.body })
}

module.exports = home
