let { users } = require('../data.js')

const getUsers = (req, res) => {
  res.status(200).json({ success: true, data: users })
}

const auth = (req, res) => {
  const { userName, password } = req.body
  const user = users.find((user) => user.user === userName)

  if (!user) {
    return res.status(401).json({ success: false, data: `Неверный логин или пароль` })
  }

  if (user) {
    if (user.password === password) {
      return res
        .status(200)
        .json({ success: true, data: { user: { name: user.name, role: user.role } } })
    }
    return res.status(401).json({ success: false, data: `Неверный логин или пароль` })
  }
}

module.exports = { getUsers, auth }
