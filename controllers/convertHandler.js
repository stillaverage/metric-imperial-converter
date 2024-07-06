function ConvertHandler() {
  units = ['gal', 'l', 'kg', 'lbs', 'km', 'mi']

  this.getNum = function(input) {
    const splitIndex = input.indexOf(input.match(/[A-Z]+/i))
    let initNum;
    if (splitIndex === 0) {
      initNum = '1.0';
    } else if (splitIndex === -1) {
      initNum = input
    } else {
      initNum = input.slice(0, splitIndex)
    }
    if (/[^A-Z]/ig.test(input.slice(splitIndex)) || /\s+/.test(initNum)) {
      initNum = NaN
    } else if ((initNum.match(/\//g) || '').length === 1) {
      initNum = Number(initNum.split('/')[0]) / Number(initNum.split('/')[1])
    }
    return isNaN(initNum) ? NaN : Number(initNum);
  };
  
  this.getUnit = function(input) {
    const splitIndex = input.indexOf(input.match(/[A-Z]+/i))
    let initUnit;
    if (splitIndex === -1) {
      initUnit = 'invalid'
    } else {
      initUnit = input.slice(splitIndex)
    }
    if (/[^A-Z]/ig.test(initUnit) || !units.includes(initUnit.toLowerCase())) {
      initUnit = 'invalid'
    }
    return initUnit.toLowerCase() === 'l' ? 'L' : initUnit.toLowerCase();
  };
  
  this.getReturnUnit = function(initUnit) {
    let returnUnit;
    switch (initUnit) {
      case 'gal':
        returnUnit = 'L'
        break
      case 'L':
        returnUnit = 'gal'
        break
      case 'lbs':
        returnUnit = 'kg'
        break
      case 'kg':
        returnUnit = 'lbs'
        break
      case 'mi':
        returnUnit = 'km'
        break
      case 'km':
        returnUnit = 'mi'
        break
    }
    return returnUnit
  };

  this.spellOutUnit = function(unit) {
    let fullUnit;
    switch (unit) {
      case 'gal':
        fullUnit = 'gallons'
        break
      case 'L':
        fullUnit = 'liters'
        break
      case 'lbs':
        fullUnit = 'pounds'
        break
      case 'kg':
        fullUnit = 'kilograms'
        break
      case 'mi':
        fullUnit = 'miles'
        break
      case 'km':
        fullUnit = 'kilometers'
        break
    }
    return fullUnit
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let returnNum;
    switch (initUnit) {
      case 'gal':
        returnNum = initNum * galToL
        break
      case 'L':
        returnNum = initNum / galToL
        break
      case 'lbs':
        returnNum = initNum * lbsToKg
        break
      case 'kg':
        returnNum = initNum / lbsToKg
        break
      case 'mi':
        returnNum = initNum * miToKm
        break
      case 'km':
        returnNum = initNum / miToKm
        break
    }
    return Math.round(returnNum * 1e5) / 1e5
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let string;
    if (isNaN(initNum) && initUnit === 'invalid') {
      string = 'invalid number and unit'
    } else if (isNaN(initNum)) {
      string = 'invalid number'
    } else if (initUnit === 'invalid') {
      string = 'invalid unit'
    } else {
      string = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum.toFixed(5)} ${this.spellOutUnit(returnUnit)}`
    }
    return string
  };
}

module.exports = ConvertHandler;
