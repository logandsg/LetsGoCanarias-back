const usersRouter = require('express').Router()
const { checkAuth } = require('../../utils')

const {
  addUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getUser,
  addFav,
  delFav,
  getFav
} = require('../controllers/users.controller')

usersRouter.get('/', getAllUsers)
usersRouter.get('/favs', checkAuth, getFav)
usersRouter.get('/:idUser', getUser)
usersRouter.post('/', addUser)
usersRouter.post('/favs', checkAuth, addFav)
usersRouter.put('/:idUser', updateUser)
usersRouter.delete('/favs', checkAuth, delFav)
usersRouter.delete('/:idUser', deleteUser)

exports.usersRouter = usersRouter
