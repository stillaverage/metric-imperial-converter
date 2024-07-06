const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  suite('Input Tests', function(){
    test('whole number input', function(){
      assert.strictEqual(convertHandler.getNum('5mi'), 5)
    });
    test('decimal number input', function(){
      assert.strictEqual(convertHandler.getNum('5.1mi'), 5.1)
    });
    test('fractional input', function(){
      assert.strictEqual(convertHandler.getNum('5/2mi'), 5/2)
    });
    test('fractional input with a decimal', function(){
      assert.strictEqual(convertHandler.getNum('5.4/3mi'), 5.4/3)
    });
    test('error on a double-fraction', function(){
      assert.isNaN(convertHandler.getNum('2/3/3mi'))
    });
    test('default to a numerical input of 1', function(){
      assert.strictEqual(convertHandler.getNum('mi'), 1)
    });
    test('each valid input unit', function(){
      assert.strictEqual(convertHandler.getUnit('5gal'), 'gal')
      assert.strictEqual(convertHandler.getUnit('5L'), 'L')
      assert.strictEqual(convertHandler.getUnit('5mi'), 'mi')
      assert.strictEqual(convertHandler.getUnit('5km'), 'km')
      assert.strictEqual(convertHandler.getUnit('5lbs'), 'lbs')
      assert.strictEqual(convertHandler.getUnit('5kg'), 'kg')
    });
    test('error for an invalid input unit', function(){
      assert.isTrue(convertHandler.getUnit('min') === 'invalid')
    });
  });
  suite('Conversion Tests', function(){
    test('correct return unit for each valid input unit', function(){
      assert.strictEqual(convertHandler.getReturnUnit('gal'), 'L')
      assert.strictEqual(convertHandler.getReturnUnit('L'), 'gal')
      assert.strictEqual(convertHandler.getReturnUnit('mi'), 'km')
      assert.strictEqual(convertHandler.getReturnUnit('km'), 'mi')
      assert.strictEqual(convertHandler.getReturnUnit('lbs'), 'kg')
      assert.strictEqual(convertHandler.getReturnUnit('kg'), 'lbs')
    });
    test('spelled-out string unit for each valid input unit', function(){
      assert.strictEqual(convertHandler.spellOutUnit('gal'), 'gallons')
      assert.strictEqual(convertHandler.spellOutUnit('L'), 'liters')
      assert.strictEqual(convertHandler.spellOutUnit('mi'), 'miles')
      assert.strictEqual(convertHandler.spellOutUnit('km'), 'kilometers')
      assert.strictEqual(convertHandler.spellOutUnit('lbs'), 'pounds')
      assert.strictEqual(convertHandler.spellOutUnit('kg'), 'kilograms')
    });
    test('convert gal to L', function(){
      assert.strictEqual(convertHandler.convert(1, 'gal'), 3.78541)
    });
    test('convert L to gal', function(){
      assert.strictEqual(convertHandler.convert(1, 'L'), 0.26417)
    });
    test('convert mi to km', function(){
      assert.strictEqual(convertHandler.convert(1, 'mi'), 1.60934)
    });
    test('convert km to mi', function(){
      assert.strictEqual(convertHandler.convert(1, 'km'), 0.62137)
    });
    test('convert lbs to kg', function(){
      assert.strictEqual(convertHandler.convert(1, 'lbs'), 0.45359)
    });
    test('convert kg to lbs', function(){
      assert.strictEqual(convertHandler.convert(1, 'kg'), 2.20462)
    });
  })
});