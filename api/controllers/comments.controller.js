const { CommentModel } = require('../models/comments.model')
const { PlaceModel } = require('../models/places.model')

function reCalculateRate (place, userId, deletedCommentId, newRate) {
  const arrRatedComment = place.comments.filter(function (comment) {
    if (comment.rate !== null && comment.userId.toString() !== userId.toString() && comment.id.toString() !== deletedCommentId.toString()) {
      return true
    }
    return false
  })
  if (arrRatedComment.length > 0) {
    let totalSumRate = 0
    for (let i = 0; i < arrRatedComment.length; i++) {
      totalSumRate += arrRatedComment[i].rate
    }
    console.log(totalSumRate, arrRatedComment.length, newRate)
    if (newRate > 0) {
      return Math.floor((parseInt(totalSumRate) + parseInt(newRate)) / (arrRatedComment.length + 1))
    } else {
      return Math.floor(totalSumRate / arrRatedComment.length)
    }
  }
  if (newRate > 0) {
    return newRate
  }
  return 0
}

function setAllCommentToNullRate (place, userId, commentId) {
  const commentWithRate = place.comments.filter(function (comment) {
    if (comment.userId.toString() === userId.toString() && comment.rate !== null && comment.id.toString() !== commentId.toString()) {
      return true
    }
    return false
  })
  for (let i = 0; i < commentWithRate.length; i++) {
    CommentModel
      .findById(commentWithRate[i].id)
      .then(comment => {
        comment.rate = null
        comment.save()
      })
      .catch(err => {
        console.log(err)
      })
  }
}

exports.addComment = (req, res) => {
  CommentModel
    .create({
      userId: res.locals.user._id,
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
          if (req.body.rate !== null) {
            setAllCommentToNullRate(place, res.locals.user._id, comment.id)
            place.rate = reCalculateRate(place, res.locals.user._id, 0, req.body.rate)
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
            if (place.comments.length > 0 && req.body.rate !== null) {
              setAllCommentToNullRate(place, res.locals.user._id, req.params.idComment)
              place.rate = reCalculateRate(place, res.locals.user._id, 0, req.body.rate)
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
  CommentModel
    .findByIdAndRemove(req.params.idComment)
    .then(comment => {
      PlaceModel
        .findById(req.body.placeId)
        .then(place => {
          console.log(place.comments.indexOf(req.params.idComment))
          place.comments.splice(place.comments.indexOf(req.params.idComment), 1)
          place.save()
        })
        .catch(err => console.log(err))
      PlaceModel
        .findById(req.body.placeId)
        .populate('comments')
        .then(place => {
          place.rate = reCalculateRate(place, 0, req.params.idComment, null)
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
