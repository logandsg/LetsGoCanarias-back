const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { isValidEmail } = require('../../utils')

const { UserModel } = require('../models/users.model')

exports.addUser = (req, res) => {
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
              rol: req.body.rol,
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
              return res.json({ token: token, ...userData })
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

exports.getUser = (req, res) => {
  UserModel
    .findById(req.params.idUser, { password: 0, __v: 0 })
    .then(Users => res.status(200).json(Users))
    .catch(err => {
      console.log(err)
      res.status(500).json({ msg: 'Error' })
    })
}

exports.getAllUsers = (req, res) => {
  UserModel
    .find({}, { password: 0, __v: 0 })
    .then(Users => res.status(200).json(Users))
    .catch(err => {
      console.log(err)
      res.status(500).json({ msg: 'Error' })
    })
}

exports.updateUser = (req, res) => {
  UserModel
    .findById(req.params.idUser)
    .then(user => {
      if (req.body.email) {
        if (!isValidEmail(req.body.email)) {
          return res.status(409).json({ err: 'Wrong email format' })
        }
      }
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 10)
      }

      user.firstName = req.body.firstName ?? user.firstName
      user.lastName = req.body.lastName ?? user.lastName
      user.nickName = req.body.nickName ?? user.nickName
      user.email = req.body.email ?? user.email
      user.rol = req.body.rol ?? user.rol

      user.save(function (err, result) {
        if (err) {
          res.status(500).json({ msg: 'Error' })
        } else {
          res.status(200).json({ msg: 'Update successful!' })
        }
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ msg: 'Error' })
    })
}

exports.deleteUser = (req, res) => {
  UserModel
    .findByIdAndRemove(req.params.idUser)
    .then(user => {
      res.status(200).json({ msg: `The user with email: ${user.email}, has been deleted!` })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ msg: 'Error' })
    })
}

exports.addFav = (req, res) => {
  UserModel
    .findById(res.locals.user._id)
    .then(user => {
      user.favs.push(req.body.favs)
      user.save()
      res.status(200).json({ user })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ msg: 'Error' })
    })
}

exports.delFav = (req, res) => {
  UserModel
    .findById(res.locals.user._id)
    .then(user => {
      user.favs.splice(user.favs.indexOf(req.body.favs), 1)
      user.save()
      res.status(200).json({ user })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ msg: 'Error' })
    })
}
