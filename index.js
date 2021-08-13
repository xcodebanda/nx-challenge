const app = require('./src')
require('dotenv/config')

app.listen(process.env.PORT || 4000, () => {
  console.log('Listo')
})
