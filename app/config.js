module.exports = {
  port: process.env.PORT || 3011,
  cookie: {
    name: process.env.COOKIE_NAME || 'asbtc-session',
    maxAge: process.env.COOKIE_DURATION || 60 * 60 * 24 * 365 * 1000, // 1 year
    secret: process.env.COOKIE_SECRET || 'asbtc-secret',
  },
  defaults: {
    connectionString: process.env.DEFAULT_CONNECTION_STRING || '',
    queueOrTopicName: process.env.DEFAULT_QUEUE_OR_TOPIC_NAME || '',
    subscriptionName: process.env.DEFAULT_SUBSCRIPTION_NAME || '',
  },
}
