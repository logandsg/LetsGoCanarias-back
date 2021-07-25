const { CommentModel } = require('../models/comments.model')
const { PlaceModel } = require('../models/places.model')

function reCalculateRate (place, newRate) {
  const arrRatedComment = place.comments.filter(comment => comment.rate !== 0)
  let totalSumRate = 0
  for (let i = 0; i < arrRatedComment; i++) {
    totalSumRate += arrRatedComment[i].rate
  }
  return (totalSumRate + newRate) / (arrRatedComment.length + 1)
}

function setLastCommentToZero (place, userId) {
  const commentWithRate = place.comments.filter(comment => comment.user === userId && comment.rate !== 0)
  if (commentWithRate) {
    CommentModel
      .findById(commentWithRate.id)
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
  PlaceModel
    .findById(req.body.placeId)
    .populate('comments')
    .then(place => {
      if (req.body.rate) {
        setLastCommentToZero(place, req.body.userId)
        place.rate = reCalculateRate(place, req.body.rate)
      }
      CommentModel
        .create({
          user: req.body.userId,
          title: req.body.title,
          message: req.body.message,
          rate: req.body.rate,
          createdAt: new Date()
        })
        .then(comment => {
          place.comment.push(comment.id)
        })
        .catch(err => {
          console.log(err)
          res.status(500).json({ msg: 'Error' })
        })
      res.json(200).json()
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
      if (req.body.rate) {
        PlaceModel
          .findById(req.body.placeId)
          .then(place => {
            setLastCommentToZero(place, req.body.userId)
            place.rate = reCalculateRate(place, req.body.rate)
            place.save()
          })
      }
      res.json(200).json()
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ msg: 'Error' })
    })
}

exports.deleteUser = (req, res) => {
  CommentModel
    .findByIdAndRemove(req.params.commentId)
    .then(comment => {
      PlaceModel
        .findById(req.body.placeId)
        .then(place => {
          place.comments = place.comments.splice(place.comments.indexOf(req.params.id), 1)
          place.save()
        })
        .catch(err => console.log(err))
      res.json(200).json({ msg: 'Comment deleted!'})
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ msg: 'Error' })
    })
}