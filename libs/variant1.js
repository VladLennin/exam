function isNumber(x) {
  return typeof x === 'number'
}

function isBigNumber(x) {
  if (
    !x || typeof x !== 'object' ||
    typeof x.constructor !== 'function'
  ) {
    return false
  }

  if (
    x.isBigNumber === true &&
    typeof x.constructor.prototype === 'object' &&
    x.constructor.prototype.isBigNumber === true
  ) {
    return true
  }

  if (
    typeof x.constructor.isDecimal === 'function' &&
    x.constructor.isDecimal(x) === true
  ) {
    return true
  }

  return false
}

function isComplex(x) {
  return (x && typeof x === 'object' && Object.getPrototypeOf(x).isComplex === true) || false
}

function isFraction(x) {
  return (x && typeof x === 'object' && Object.getPrototypeOf(x).isFraction === true) || false
}

function isUnit(x) {
  return (x && x.constructor.prototype.isUnit === true) || false
}

function isString(x) {
  return typeof x === 'string'
}

const isArray = Array.isArray

function isMatrix(x) {
  return (x && x.constructor.prototype.isMatrix === true) || false
}

/**
 * Test whether a value is a collection: an Array or Matrix
 * @param {*} x
 * @returns {boolean} isCollection
 */
function isCollection(x) {
  return Array.isArray(x) || isMatrix(x)
}

function isDenseMatrix(x) {
  return (x && x.isDenseMatrix && x.constructor.prototype.isMatrix === true) || false
}

function isSparseMatrix(x) {
  return (x && x.isSparseMatrix && x.constructor.prototype.isMatrix === true) || false
}

module.exports = {
  isArray, isComplex, isNumber, isBigNumber, isFraction, isUnit, isString, isCollection, isDenseMatrix, isSparseMatrix,isMatrix
}
