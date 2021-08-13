const { connect } = require('mongoose')
require('dotenv/config')

module.exports = async () => {
  const uri = process.env.MONGO_URI || ''

  try {
    await connect(uri, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    })

    if (process.env.NODE_ENV !== 'production') {
      console.log('Database connected')
    }
  } catch (error) {

  }
}
