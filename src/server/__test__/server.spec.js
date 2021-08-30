import 'babel-polyfill'

const request = require('supertest')
const { app } = require('../index')

describe('API Test', () => {
  test('It Should give not found as new-url is post not get', (done) => {
    request(app)
      .get('/new-url')
      .then((response) => {
        expect(response.statusCode).toBe(404)
        done()
      })
  })
  test('Should Direct To index.html', (done) => {
    request(app)
      .get('/')
      .send('./dist/index.html')
      .then((response) => {
        expect(response.statusCode).toEqual(200)
        done()
      })
  })
  test('It Should response with error for wrong path', (done) => {
    request(app)
      .get('/mostatic')
      .then((response) => {
        expect(response.statusCode).toBe(404)
        done()
      })
  })
})
