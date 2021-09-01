const dotenv = require('dotenv');
dotenv.config();

var path = require('path')

const fetch = require('node-fetch');
const mockAPIResponse = require('./mockAPI.js')

const PORT = 8081

//require express ==> create instance  
const express = require('express');
const app = express();

// Cors allows the browser and server to communicate without any security interruptions
const cors = require('cors');
app.use(cors());

// body parser
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// static dist
app.use(express.static('dist'))

const axios = require('axios')

// API
const API_KEY = process.env.API_KEY
var getUrl = [];

app.get('/', function (req, res) {
    //res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})

// POST Route
app.post('/', async (req, res) => {
    getUrl  = req.body.getUrl
    const meaningCloudUrl = `https://api.meaningcloud.com/sentiment-2.1?key=${process.env.API_KEY}&url=${getUrl}&lang=en`
    try {
      const {
        data: { sentence_list, agreement, subjectivity, confidence, irony },
      } = await axios(meaningCloudUrl)
      res.send({
        text: sentence_list[0].text || '',
        agreement: agreement,
        subjectivity: subjectivity,
        confidence: confidence,
        irony: irony,
      })
    } catch (error) {
      console.log(error.message)
    }
  })

  app.get('/test', function (req, res) {
      res.send(mockAPIResponse)
  })

// Port listening to the requests
app.listen(PORT, function () {
    console.log(`Server is running on port ${PORT}!`);
  });

module.exports = {
    app,
  }