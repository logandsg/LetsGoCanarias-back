const usersRouter = require('express').Router()

const {
  addUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getUser
} = require('../controllers/users.controller')

usersRouter.get('/', getAllUsers)
usersRouter.get('/:idUser', getUser)
usersRouter.post('/', addUser)
usersRouter.put('/:idUser', updateUser)
usersRouter.delete('/:idUser', deleteUser)

exports.usersRouter = usersRouter
