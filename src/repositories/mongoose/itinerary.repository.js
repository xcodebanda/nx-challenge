const { Itinerary } = require('../../models/mongoose')

exports.addItinerary = async values => await Itinerary.create(values)
exports.getItineraries = async filters => await Itinerary.find(filters)
exports.totalItineraries = async () => await Itinerary.countDocuments()
exports.getItinerary = async filters => await Itinerary.findOne(filters)
exports.updateItinerary = async (filter, values, options) => await Itinerary.findOneAndUpdate(filter, values, options)
