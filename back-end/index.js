require('dotenv').config()
const {errorHandler} = require('./middleware/errorHandler')
const { connectDB } = require('./config/db')
connectDB()

const express = require('express')

const app = express()
const cors = require('cors')

const authRoute = require('./routers/authRoute')
const productRoute = require('./routers/productRoute')

app.use(cors())
app.use(express.json())

app.use('/api/v1/auth', authRoute)
app.use('/api/v1/products', productRoute)
app.get('/', (req, res) => res.send('halo'))

//err
app.all('*', (req, res, next) => {
  const err = new Error('Page not found')
  err.statusCode = 404
  next(err)
})
app.use(errorHandler)

const port = process.env.APP_PORT
app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`))