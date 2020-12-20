module.exports = {
  port: process.env.PORT || 3011,
  cookie: {
    name: process.env.COOKIE_NAME || 'asbtc-session',
    maxAge: process.env.COOKIE_DURATION || 28 * 24 * 60 * 60 * 1000, // 28 days in millis
    secret: process.env.COOKIE_SECRET || 'asbtc-secret'
  }
}
