const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  this.timeout(5000)
  suite('Integration tests', function(){
    test('Convert a valid input', function (done) {
      chai
        .request(server)
        .keepOpen()
        .get('/api/convert')
        .query({ input: '10L' })
        .end(function (err, res) {
          assert.equal(res.status, 200)
          assert.equal(res.body.initNum, 10)
          assert.equal(res.body.initUnit, 'L')
          assert.equal(res.body.returnNum, 2.64172)
          assert.equal(res.body.returnUnit, 'gal')
          done()
        })
    })
    test('Convert an invalid input', function (done) {
      chai
        .request(server)
        .keepOpen()
        .get('/api/convert')
        .query({ input: '32g' })
        .end(function (err, res) {
          assert.equal(res.status, 200)
          assert.isNotOk(res.body.string)
          done()
        })
    })
    test('Convert an invalid number', function (done) {
      chai
        .request(server)
        .keepOpen()
        .get('/api/convert')
        .query({ input: '3/7.2/4kg' })
        .end(function (err, res) {
          assert.equal(res.status, 200)
          assert.isNotOk(res.body.string)
          done()
        })
    })
    test('Convert an invalid number AND unit', function (done) {
      chai
        .request(server)
        .keepOpen()
        .get('/api/convert')
        .query({ input: '3/7.2/4kilomegagram' })
        .end(function (err, res) {
          assert.equal(res.status, 200)
          assert.isNotOk(res.body.string)
          done()
        })
    })
    test('Convert with no number', function (done) {
      chai
        .request(server)
        .keepOpen()
        .get('/api/convert')
        .query({ input: 'kg' })
        .end(function (err, res) {
          assert.equal(res.status, 200)
          assert.equal(res.body.initNum, 1)
          assert.equal(res.body.initUnit, 'kg')
          assert.equal(res.body.returnNum, 2.20462)
          assert.equal(res.body.returnUnit, 'lbs')
          done()
        })
    })  
  })
});
