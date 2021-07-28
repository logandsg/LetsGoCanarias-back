const jwt = require('jsonwebtoken')
// const { token } = require('morgan')
// const { runInNewContext } = require('vm')
const { UserModel } = require('../api/models/users.model')

exports.checkAuth = (req, res, next) => {
  console.log(req.body)
  jwt.verify(req.headers.authorization, process.env.SECRET, (err, token) => {
    if (err) { res.status(403).json({ error: 'Token not valid' }) }
    UserModel
      .findOne({ email: token.email })
      .then(user => {
        if (user) {
          req.body.token = token
          res.locals.user = user
          next()
        } else {
          res.status(500).json({ err: 'Token not valid' })
        }
      })
  })
}

exports.checkManager = (req, res, next) => {
  UserModel
    .findOne({ email: req.body.token.email })
    .then(user => {
      if (user.rol === 'Manager') {
        res.locals.user = user
        next()
      } else {
        res.status(500).json({ err: 'Token not valid' })
      }
    })
}

exports.isValidEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}
