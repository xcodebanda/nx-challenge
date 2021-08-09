const Itinerary = require('./itinerary.model')

/**
 *  Data Access Logic
 */

exports.getItineraries = async options => await Itinerary.find(
  options.filters,
  options.fields
    ? options.fields
    : null
)
exports.addItinerary = async values => await Itinerary.create(values)
exports.updateItineraryById = async (id, values) => await Itinerary.findByIdAndUpdate(id, values)
