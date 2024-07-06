'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get((req, res, done) => {
    const input = req.query.input
    const initNum = convertHandler.getNum(input)
    const initUnit = convertHandler.getUnit(input)
    const returnUnit = convertHandler.getReturnUnit(initUnit)
    const returnNum = convertHandler.convert(initNum, initUnit)
    const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit)
    if (!string.includes('invalid')) {
      res.json({ initNum, initUnit, returnNum, returnUnit, string})
    } else {
      res.json({ string }.string)
    }
  })
};
