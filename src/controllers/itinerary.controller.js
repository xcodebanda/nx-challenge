const { request, response } = require('express')
const { Types } = require('mongoose')

const { __catch, RequestReponse } = require('../helpers')
const { itineraryRepository: repository } = require('../repositories/mongodb')

exports.getCityItineraries = __catch(async (req = request, res = response) => {
  const opt = { cityId: req.params.cityid }
  if (req.query.all !== '') opt.isActive = true

  const totalPromise = repository.getTotal(opt)
  const itinerariesPromise = repository.getItineraries(opt)

  const [itineraries, total] = await Promise.all([itinerariesPromise, totalPromise])
  const result = RequestReponse.success(200, itineraries)

  result.total = total
  res.status(200).json(result)
})

exports.addItinerary = __catch(async (req = request, res = response) => {
  const result = await repository.addItinerary(req.body)

  res.status(201).json(
    RequestReponse.success(201, result)
  )
})

exports.checkUser = __catch(async (req = request, res = response) => {
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

  res.status(200).json(
    RequestReponse.success(
      200,
      {
        arrayOwnerCheck: arrayOwnerCheck.map(c => c._id),
        likedChek
      }
    )
  )
})

exports.likes = __catch(async (req = request, res = response) => {
  const itinerary = await repository.getItineraries({ _id: req.params.itineraryId })
  const liked = itinerary[0].usersLike.some(id => id === req.user._id)

  res.status(200).json(
    RequestReponse.success(
      200,
      {
        likes: itinerary[0].likes,
        liked
      }
    )
  )
})

exports.addComment = __catch(async (req = request, res = response) => {
  const itinerary = await repository.getItineraries({ _id: req.params.itineraryId })

  if (itinerary.length === 0) {
    return res.status(404).json(
      RequestReponse.fail(
        'Itinerary was not found',
        404
      )
    )
  }

  itinerary[0].comments.push(
    {
      _id: Types.ObjectId(),
      userId: req.user._id,
      text: req.body.text,
      userPic: req.user.userPic,
      userName: `${req.user.firstName} ${req.user.lastName}`
    // TODO: Create Comment Model & use DTO/Repositories
    }
  )

  const result = await repository.updateItineraryByID(
    req.params.itineraryId,
    itinerary[0]
  )

  res.status(200).json(
    RequestReponse.success(
      200,
      {
        response: result.comments,
        arrayUserComments: result.comments.filter(
          comment => String(comment.userId) === String(req.user._id)
        )
      }
    )
  )
})

exports.deleteComment = __catch(async (req = request, res = response) => {
  const itinerary = await repository.getItineraries({ _id: req.params.itineraryId })

  if (itinerary.length === 0) {
    return res.status(404).json(
      RequestReponse.fail(
        'Itinerary was not found',
        404
      )
    )
  }

  const comments = itinerary[0].comments.filter(
    c => String(c._id) !== String(req.params.commentId)
  )

  if (comments.length === itinerary[0].comments.length) {
    return res.status(404).json(
      RequestReponse.fail(
        'Comment was not found',
        404
      )
    )
  } else {
    itinerary[0].comments = comments
  }

  await repository.updateItineraryByID(
    req.params.itineraryId,
    itinerary[0]
  )

  res.status(200).json(
    RequestReponse.success(
      200,
      {
        response: comments
      }
    )
  )
})
