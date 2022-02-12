const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')

app.use('/api/blogs', blogsRouter)

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)
.then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})