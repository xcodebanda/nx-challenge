const { connect, repositories } = require('./mongodb')

module.exports = {
  mongodb: connect,
  mongoRepositories: repositories
}
