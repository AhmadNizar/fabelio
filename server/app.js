const express       = require('express')
const app           = express()
const mongoose      = require('mongoose')
const port          = 3000
const productRouter = require('./Routes')
require('dotenv').config()

const mongoDBUrl = `mongodb://AhmadNizar:${process.env.DB_PASSWORD}@ahmadnizardb-shard-00-00-scdlc.mongodb.net:27017,ahmadnizardb-shard-00-01-scdlc.mongodb.net:27017,ahmadnizardb-shard-00-02-scdlc.mongodb.net:27017/ruanganID?ssl=true&replicaSet=AhmadNizarDB-shard-0&authSource=admin&retryWrites=true`

mongoose.connect(`${mongoDBUrl}`, (err) => {
  if(!err) {
    console.log('DATABASE TERHUBUNG');
  } else {
    console.log('TIDAK TERHUBUNG DATABASE',err);
  }
})
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/product', productRouter)

app.get('/', (req, res) => res.send('Hello World'))

app.listen(port, () => console.log('Running At 3000'))