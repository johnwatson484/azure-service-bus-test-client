module.exports = {
  port: process.env.PORT || 3011,
  cookie: {
    name: process.env.COOKIE_NAME || 'asbtc-session',
    maxAge: process.env.COOKIE_DURATION || 60 * 60 * 24 * 365 * 1000, // 1 year
    secret: process.env.COOKIE_SECRET || 'asbtc-secret',
  },
}
