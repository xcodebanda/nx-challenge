module.exports = {
  connect: require('./connect'),
  repositories: {
    itineraryRepository: require('./Itinerary'),
    cityRepository: require('./City'),
    userRepository: require('./User')
  }
}
