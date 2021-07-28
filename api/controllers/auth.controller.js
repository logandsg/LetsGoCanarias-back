const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { isValidEmail } = require('../../utils')
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
          const userData = { rol: user.rol, email: user.email, id: user._id }
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

exports.signup = (req, res) => {
  const hashedPwd = bcrypt.hashSync(req.body.password, 10)
  UserModel
    .findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        res.status(409).json({ err: 'Email already exists. Try another one' })
      } else {
        if (isValidEmail(req.body.email)) {
          UserModel
            .create({
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              nickName: req.body.nickName,
              rol: 'user',
              email: req.body.email,
              password: hashedPwd
            })
            .then(user => {
              const userData = { rol: user.rol, email: user.email }

              const token = jwt.sign(
                userData,
                process.env.SECRET,
                { expiresIn: '1h' }
              )
              return res.status(200).json({ token: token, ...userData })
            })
            .catch(err => {
              console.log(err)
              res.status(500).json({ msg: 'Error' })
            })
        } else {
          res.status(409).json({ err: 'Wrong email format' })
        }
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ msg: 'Error' })
    })
}

exports.profile = (req, res) => {
  res.status(200).json({
    user: {
      firstName: res.locals.user.firstName,
      lastName: res.locals.user.lastName,
      rol: res.locals.user.rol,
      email: res.locals.user.email,
      nickName: res.locals.user.nickName,
      favs: res.locals.user.favs
    }
  })
}
