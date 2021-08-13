const { request, response } = require('express')

const { Itinerary: repository } = require('../repositories/mongoose')
const { RequestCatch: _catch } = require('../helpers')

exports.getItinerariesByCity = _catch(async (req = request, res = response) => {
  const itinerariesPromise = repository.getItineraries({ cityId: req.params.cityId })
  const totalPromise = repository.totalItineraries()

  const [itineraries, total] = await Promise.all([
    itinerariesPromise, totalPromise
  ])

  res.status(200).json({
    itineraries,
    ok: true,
    total
  })
})

exports.addItinerary = _catch(async (req = request, res = response) => {
  const itinerary = await repository.addItinerary(req.body)

  res.status(201).json({
    itinerary,
    ok: true
  })
})

exports.checkUser = _catch(async (req = request, res = response) => {
  const itinerary = await repository.getItineraries(
    {
      _id: req.params.itineraryId
    }
  )

  const arrayOwnerCheck = itinerary[0].comments.filter(
    c => String(c.userId) === String(req.user._id)
  )

  const likedChek = itinerary[0].usersLike.some(
    id => String(id) === String(req.user._id)
  )

  res.status(200).json({
    response: {
      arrayOwnerCheck: arrayOwnerCheck.map(c => c._id),
      likedChek
    }
  })
})

exports.addComment = _catch(async (req = request, res = response) => {
  const itinerary = await repository.updateItinerary(
    {
      _id: req.params.itineraryId
    },
    {
      $push: {
        comments: {
          text: req.body.text,
          userId: req.user._id,
          userPic: req.user.userPic,
          userName: req.user.firstName
        }
      }
    },
    {
      new: true
    }
  )
  res.status(200).json({
    response: itinerary.comments,
    arrayOwnerCheck: itinerary.comments.filter(
      comment => String(comment.userId) === String(req.user._id)
    ),
    success: true
  }
  )
})

exports.deleteComment = _catch(async (req = request, res = response) => {
  const comment = await repository.getItinerary(
    {
      'comments._id': req.params.commentId,
      'comments.userId': req.user._id
    }
  )
  if (!comment) {
    return res.status(404).json({
      message: 'Error',
      succes: false
    })
  }
  const itinerary = await repository.updateItinerary({
    'comments._id': req.params.commentId
  },
  {
    $pull: {
      comments: {
        _id: req.params.commentId
      }
    }
  },
  {
    new: true
  })
  res.status(200).json({
    response: itinerary.comments,
    success: true
  })
})

exports.updateComment = _catch(async (req = request, res = response) => {
  const comment = await repository.getItinerary(
    {
      'comments._id': req.params.commentId,
      'comments.userId': req.user._id
    }
  )
  if (!comment) {
    return res.status(404).json({
      message: 'Error',
      succes: false
    })
  }
  const itinerary = await repository.updateItinerary({
    'comments._id': req.params.commentId
  },
  {
    $set: {
      'comments.$.text': req.body.text
    }
  },
  {
    new: true
  })
  res.status(200).json({
    response: itinerary.comments,
    success: true
  })
})

exports.likes = _catch(async (req = request, res = response) => {
  let itinerary = await repository.getItinerary({
    _id: req.params.itineraryId,
    usersLike: req.user._id
  })

  const filter = itinerary ? '$pull' : '$push'
  const liked = !itinerary

  itinerary = await repository.updateItinerary(
    {
      _id: req.params.itineraryId
    },
    {
      [filter]: {
        usersLike: req.user._id
      }
    },
    {
      new: true
    }
  )

  let likes = parseInt(itinerary.likes)
  itinerary = await repository.updateItinerary(
    {
      _id: req.params.itineraryId
    },
    {
      $set: {
        likes: likes += liked ? 1 : -1
      }
    },
    {
      new: true
    }
  )

  res.status(200).json({
    success: true,
    response: {
      likes: itinerary.likes,
      liked
    }
  }
  )
})
