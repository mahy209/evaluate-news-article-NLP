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
app.use(bodyParser.urlencoded({extended: false}))

// static dist
app.use(express.static('dist'))

console.log(__dirname)

// API
const baseURL = 'https://api.meaningcloud.com/sentiment-2.1?'
const apiKey = process.env.API_KEY
console.log(`Your API Key is ${process.env.API_KEY}`);
let userInput = [] // const does not work

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    //res.sendFile(path.resolve('src/client/views/index.html'))
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

// POST Route
app.post('/api', async function(req, res) {
    userInput = req.body.url;
    console.log(`You entered: ${userInput}`);
    const apiURL = `${baseURL}key=${apiKey}&url=${userInput}&lang=en`

    const response = await fetch(apiURL)
    const mcData = await response.json()
    res.send(mcData)
     const projectData = {
     score_tag : mcData.score_tag,
     agreement : mcData.agreement,
     subjectivity : mcData.subjectivity,
     confidence : mcData.confidence,
     irony : mcData.irony
    }
    console.log(mcData)
    res.send(projectData);
     
})

// port 
app.listen(PORT, (error) => {
    if (error) throw new Error(error)
    console.log(`Server listening on port ${PORT}!`)
})