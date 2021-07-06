const express = require('express')
const mongoose = require('mongoose')
const api = express()
const { router } = require('./api/routes')

mongoose.connect(
  process.env.MONGO_URL || 'mongodb://localhost:27017/',
  {
    dbName: process.env.MONGO_DB || 'test',
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
      .use(express.json())
      .use('/api', router)
      .listen(process.env.PORT || 8080, (err) => {
        console.info('\n\n' + '>'.repeat(40))
        console.info('💻  Reboot Server Live')
        console.info('📡  PORT: http://localhost:8080')
        console.info('>'.repeat(40) + '\n\n')
      })
  }
)