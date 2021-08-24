const home = async (req, res) => {
  const { session: { body } } = req
  res.render('index.njk', { body })
}

module.exports = home
