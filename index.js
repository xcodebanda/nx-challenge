const app = require('./src')
const port = process.env.PORT

app.listen(port, () => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`\nRunning: http://localhost:${port}/api`)
  }
})
