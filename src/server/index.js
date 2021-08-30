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
app.use(bodyParser.json())

// static dist
app.use(express.static('dist'))

const axios = require('axios')

// API
const API_URL = 'https://api.meaningcloud.com/sentiment-2.1'
const API_KEY = process.env.API_KEY

app.get('/', function (req, res) {
    //res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

// POST Route
app.get('/new-url', async (req, res) => {
    const { getUrl } = req.body
    const meaningCloudUrl = `${API_URL}?key=${process.env.API_KEY}&url=${getUrl}&lang=en`
    try {
      const {
        apiData: { sentence_list, agreement, subjectivity, confidence, irony },
      } = await axios(meaningCloudUrl)
      res.send({
        confidence: confidence,
        irony: irony,
        agreement: agreement,
        subjectivity: subjectivity,
        text: sentence_list[0].text || '',
      })
    } catch (error) {
      console.log(error.message)
    }
  })

// Port listening to the requests
app.listen(PORT, function () {
    console.log(`Server is running on port ${PORT}!`);
  });

module.exports = {
    app,
  }