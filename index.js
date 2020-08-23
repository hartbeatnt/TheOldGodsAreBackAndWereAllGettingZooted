// imports
const express = require('express')
const env = require('dotenv')
const s3 = require('s3')

const app = express()
env.config()

var client = s3.createClient({  
  s3Options: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.ACCESS_KEY_ID,
  }
});

// Server routes
const PATH = '/wereallgettingzooted'
app.use(PATH, express.static(__dirname))

app.get(PATH + '/1', (req, res) => {  
  // Add s3 streaming in here
})

// Start Listening
app.listen(3000, () => {  
  
});