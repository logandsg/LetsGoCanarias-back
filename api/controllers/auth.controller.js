const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { UserModel } = require('../models/users.model')

exports.login = (req, res) => {
  UserModel
    .findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        bcrypt.compare(req.body.password, user.password, (err, result) => {
          if (!result) {
            console.log(err)
            return res.status(403).json({ error: 'Wrong email or password' })
          }
          const userData = { rol: user.rol, email: user.email }
          const token = jwt.sign(
            userData,
            process.env.SECRET, // TODO SECRET MORE SECRET PLEASE
            { expiresIn: '1h' }
          )
          return res.status(200).json({ token: token, ...userData })
        })
      } else {
        return res.status(403).json({ error: 'Wrong email or password' })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ err: 'Error' })
    })
}

exports.profile = (req, res) => {
  res.status(200).json({
    firstName: res.locals.user.firstName,
    lastName: res.locals.user.lastName,
    rol: res.locals.user.rol,
    email: res.locals.user.email,
    nickName: res.locals.user.nickName
  })
}