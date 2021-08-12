const Itineray = require('../../models/mongodb/itinerary.model')

exports.addItinerary = async values => await Itineray.create(values)
exports.getItineraries = async options => await Itineray.find(options)
exports.getTotal = async options => await Itineray.countDocuments(options)
exports.updateItineraryByID = async (id, values) => await Itineray.findByIdAndUpdate(id, values, { new: true })
