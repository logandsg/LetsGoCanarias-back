const { CommentModel } = require('../models/comments.model')
const { PlaceModel } = require('../models/places.model')

function reCalculateRate (place, newRate) {
  const arrRatedComment = place.comments.filter(comment => comment.rate !== 0)
  let totalSumRate = 0
  for (let i = 0; i < arrRatedComment; i++) {
    totalSumRate += arrRatedComment[i].rate
  }
  return Math.floor((totalSumRate + newRate) / (arrRatedComment.length + 1))
}

function setAllCommentToZeroRate (place, userId, commentId) {
  const commentWithRate = place.comments.filter(function (comment) {
    if (comment.userId.toString() === userId.toString() && comment.rate > 0 && comment.id !== commentId) {
      return true
    }
    return false
  })
  for (let i = 0; i < commentWithRate.length; i++) {
    CommentModel
      .findById(commentWithRate[i].id)
      .then(comment => {
        comment.rate = 0
        comment.save()
      })
      .catch(err => {
        console.log(err)
      })
  }
}

exports.addComment = (req, res) => {
  if (req.body.rate) {
    CommentModel
      .create({
        userId: req.body.userId,
        title: req.body.title,
        message: req.body.message,
        rate: req.body.rate,
        createdAt: new Date()
      })
      .then(comment => {
        PlaceModel
          .findById(req.body.placeId)
          .populate('comments')
          .then(place => {
            if (place.comments.length > 0 && req.body.rate > 0) {
              setAllCommentToZeroRate(place, req.body.userId, comment.id)
              place.rate = reCalculateRate(place, req.body.rate)
            }
            place.comments.push(comment.id)
            place.save()
            res.status(200).json(comment)
          })
          .catch(err => {
            console.log(err)
            res.status(500).json({ msg: 'Error' })
          })
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({ msg: 'Error' })
      })
  } else {
    CommentModel
      .create({
        userId: req.body.userId,
        title: req.body.title,
        message: req.body.message,
        rate: 0,
        createdAt: new Date()
      })
      .then(comment => {
        PlaceModel
          .findById(req.body.placeId)
          .then(place => {
            place.comments.push(comment.id)
            place.save()
            res.status(200).json(comment)
          })
          .catch(err => {
            console.log(err)
            res.status(500).json({ msg: 'Error' })
          })
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({ msg: 'Error' })
      })
  }
}

exports.updateComment = (req, res) => {
  CommentModel
    .findById(req.params.idComment)
    .then(comment => {
      comment.title = req.body.title ?? comment.title
      comment.message = req.body.message ?? comment.message
      comment.createdAt = new Date()
      if (req.body.rate > 0) {
        comment.rate = req.body.rate
        PlaceModel
          .findById(req.body.placeId)
          .populate('comments')
          .then(place => {
            if (place.comments.length > 0 && req.body.rate > 0) {
              setAllCommentToZeroRate(place, req.body.userId, comment.id)
              place.rate = reCalculateRate(place, req.body.rate)
              place.save()
            }
          })
      }
      comment.save()
      res.status(200).json(comment)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ msg: 'Error' })
    })
}

exports.deleteComment = (req, res) => {
  console.log(req.params.idComment)
  CommentModel
    .findByIdAndRemove(req.params.idComment)
    .then(comment => {
      PlaceModel
        .findById(req.body.placeId)
        .then(place => {
          place.comments = place.comments.splice(place.comments.indexOf(req.params.idComment), 1)
          place.save()
        })
        .catch(err => console.log(err))
      res.status(200).json({ msg: 'Comment deleted!' })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ msg: 'Error' })
    })
}
