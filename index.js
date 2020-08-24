// imports
const express = require('express')
const env = require('dotenv')
const s3 = require('s3')

// constants
const PATH = '/wereallgettingzooted'
const tracklist = [
  "01_agua.mp3",
  "02_water.mp3",
  "03_juice.mp3",
  "04_thunder.mp3",
  "05_electric.mp3",
  "06_iron.mp3",
  "07_breakn.mp3",
  "08_stillettos.mp3",
  "09_ayy.mp3",
  "10_i.mp3",
  "11_wizard.mp3",
  "12_ride.mp3",
  "13_drowning.mp3",
  "14_once.mp3",
  "15_father.mp3",
]

// set up app
env.config()

const app = express()
const client = s3.createClient({  
  s3Options: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  }
})

const streamFile = (key, res) => {
  const fileName = isNaN(key) ? key : tracklist[key]
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: fileName,
  }

  const downloadStream = client.downloadStream(params)
  downloadStream.on('error', () => res.status(404).send('Not Found'));
  downloadStream.on('httpHeaders', (_, headers) => res.set({
    'Content-Type': headers['content-type']
  }));

  // Pipe download stream to response
  downloadStream.pipe(res);
}

// Server routes
app.use(PATH, express.static(__dirname))

app.get(PATH + '/0', (req, res) => streamFile(0, res))
app.get(PATH + '/1', (req, res) => streamFile(1, res))
app.get(PATH + '/2', (req, res) => streamFile(2, res))
app.get(PATH + '/3', (req, res) => streamFile(3, res))
app.get(PATH + '/4', (req, res) => streamFile(4, res))
app.get(PATH + '/5', (req, res) => streamFile(5, res))
app.get(PATH + '/6', (req, res) => streamFile(6, res))
app.get(PATH + '/7', (req, res) => streamFile(7, res))
app.get(PATH + '/8', (req, res) => streamFile(8, res))
app.get(PATH + '/9', (req, res) => streamFile(9, res))
app.get(PATH + '/10', (req, res) => streamFile(10, res))
app.get(PATH + '/11', (req, res) => streamFile(11, res))
app.get(PATH + '/12', (req, res) => streamFile(12, res))
app.get(PATH + '/13', (req, res) => streamFile(13, res))
app.get(PATH + '/14', (req, res) => streamFile(14, res))
app.get(PATH + '/prompt.png', (req, res) => streamFile('prompt.png', res))

app.get("*", (_, res) => res.redirect(PATH))

// Start Listening
app.listen(3000, () => {  
  console.log("listening")
});