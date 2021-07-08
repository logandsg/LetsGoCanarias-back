require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const path = require('path')

const api = express()
const { router } = require('./api/routes')

mongoose.connect(
  process.env.MONGO_URL || 'mongodb://localhost:27017/',
  {
    dbName: process.env.MONGO_DB || 'lgc',
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  },
  (err) => {
    if (err) {
      console.log(`DB error: ${err}`)
      return
    }
    console.log('Connected to DB')

    api
      .use(morgan('dev'))
      .use(cors())
      .use(express.json())
      .use(express.static(path.join(__dirname, 'public')))
      .use('/api', router)
      .listen(process.env.PORT || 3000, (err) => {
        console.info('\n\n' + '>'.repeat(40))
        console.info('💻  Reboot Server Live')
        console.info('📡  PORT: http://localhost:3000')
        console.info('>'.repeat(40) + '\n\n')
      })
  }
)
