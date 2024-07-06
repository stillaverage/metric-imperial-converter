'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get((req, res, done) => {
    const input = req.query.input
    console.log(input)
    const initNum = convertHandler.getNum(input)
    console.log(initNum)
    const initUnit = convertHandler.getUnit(input)
    console.log(initUnit)
    const returnUnit = convertHandler.getReturnUnit(initUnit)
    console.log(returnUnit)
    const returnNum = convertHandler.convert(initNum, initUnit)
    console.log(returnNum)
    let string;
    if (isNaN(initNum) && initUnit === 'invalid') {
      string = 'invalid number and unit'
    } else if (isNaN(initNum)) {
      string = 'invalid number'
    } else if (initUnit === 'invalid') {
      string = 'invalid unit'
    } else {
      string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit)
    }
    console.log(string)
    if (!string.includes('invalid')) {
      res.json({ initNum, initUnit, returnNum, returnUnit, string})
    } else {
      res.json({ string }.string)
    }
  })
};
