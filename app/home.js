const home = async (req, res) => {
  const { session: { body } } = req
  res.render('home.njk', { body })
}

module.exports = home
