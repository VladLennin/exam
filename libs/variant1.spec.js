const {
  isNumber,
  isBigNumber,
  isComplex,
  isFraction,
  isUnit,
  isString,
  isArray,
  isMatrix,
  isCollection,
  isDenseMatrix,
  isSparseMatrix
} = require('./variant1.js')


describe('variant1.js utility functions', () => {
  describe('isNumber', () => {
    test('should return true for numbers', () => {
      expect(isNumber(42)).toBe(true);
      expect(isNumber(-3.14)).toBe(true);
      expect(isNumber(0)).toBe(true);
    });

    test('should return false for non-numbers', () => {
      expect(isNumber('42')).toBe(false);
      expect(isNumber(null)).toBe(false);
      expect(isNumber(undefined)).toBe(false);
      expect(isNumber({})).toBe(false);
      expect(isNumber([])).toBe(false);
    });
  });



  describe('isBigNumber', () => {
    test('should return false for plain numbers', () => {
      expect(isBigNumber(123)).toBe(false);
    });

    test('should return false for null', () => {
      expect(isBigNumber(null)).toBe(false);
    });

    test('should return false for undefined', () => {
      expect(isBigNumber(undefined)).toBe(false);
    });

    test('should return false for strings', () => {
      expect(isBigNumber('123')).toBe(false);
    });

    test('should return false for objects without required properties', () => {
      const invalidMock = {
        isBigNumber: false,
      };
      expect(isBigNumber(invalidMock)).toBe(false);
    });

    test('should return false if constructor is not a function', () => {
      const invalidMock = {
        isBigNumber: true,
        constructor: {},
      };
      expect(isBigNumber(invalidMock)).toBe(false);
    });

    test('should return false if constructor.prototype is not an object', () => {
      const invalidMock = {
        isBigNumber: true,
        constructor: {
          prototype: null,
        },
      };
      expect(isBigNumber(invalidMock)).toBe(false);
    });

    test('should return false for objects missing isDecimal method on constructor', () => {
      const invalidMock = {
        constructor: {
          isDecimal: null,
        },
      };
      expect(isBigNumber(invalidMock)).toBe(false);
    });

    test('should return false for objects with mismatched Decimal logic', () => {
      const invalidMock = {
        constructor: {
          isDecimal: () => false,
        },
      };
      expect(isBigNumber(invalidMock)).toBe(false);
    });
  });

  describe('isComplex', () => {
    test('should return true for Complex-like objects', () => {
      const complexMock = {isComplex: true};
      Object.setPrototypeOf(complexMock, {isComplex: true});
      expect(isComplex(complexMock)).toBe(true);
    });

    test('should return false for non-Complex objects', () => {
      expect(isComplex(null)).toBe(false);
      expect(isComplex({})).toBe(false);
      expect(isComplex([])).toBe(false);
      expect(isComplex(42)).toBe(false);
    });
  });

  describe('isFraction', () => {
    test('should return true for Fraction-like objects', () => {
      const fractionMock = {isFraction: true};
      Object.setPrototypeOf(fractionMock, {isFraction: true});
      expect(isFraction(fractionMock)).toBe(true);
    });

    test('should return false for non-Fraction objects', () => {
      expect(isFraction(null)).toBe(false);
      expect(isFraction({})).toBe(false);
      expect(isFraction([])).toBe(false);
      expect(isFraction(42)).toBe(false);
    });
  });

  describe('isUnit', () => {
    test('should return true for Unit-like objects', () => {
      const unitMock = {constructor: {prototype: {isUnit: true}}};
      expect(isUnit(unitMock)).toBe(true);
    });

    test('should return false for non-Unit objects', () => {
      expect(isUnit(null)).toBe(false);
      expect(isUnit({})).toBe(false);
      expect(isUnit([])).toBe(false);
      expect(isUnit(42)).toBe(false);
    });
  });

  describe('isString', () => {
    test('should return true for strings', () => {
      expect(isString('Hello')).toBe(true);
      expect(isString('')).toBe(true);
    });

    test('should return false for non-strings', () => {
      expect(isString(42)).toBe(false);
      expect(isString(null)).toBe(false);
      expect(isString(undefined)).toBe(false);
      expect(isString({})).toBe(false);
      expect(isString([])).toBe(false);
    });
  });

  describe('isArray', () => {
    test('should return true for arrays', () => {
      expect(isArray([])).toBe(true);
      expect(isArray([1, 2, 3])).toBe(true);
    });

    test('should return false for non-arrays', () => {
      expect(isArray(42)).toBe(false);
      expect(isArray(null)).toBe(false);
      expect(isArray(undefined)).toBe(false);
      expect(isArray({})).toBe(false);
    });
  });

  describe('isMatrix', () => {
    test('should return true for Matrix-like objects', () => {
      const matrixMock = {constructor: {prototype: {isMatrix: true}}};
      expect(isMatrix(matrixMock)).toBe(true);
    });

    test('should return false for non-Matrix objects', () => {
      expect(isMatrix(null)).toBe(false);
      expect(isMatrix({})).toBe(false);
      expect(isMatrix([])).toBe(false);
      expect(isMatrix(42)).toBe(false);
    });
  });

  describe('isCollection', () => {
    test('should return true for arrays and Matrix-like objects', () => {
      const matrixMock = {constructor: {prototype: {isMatrix: true}}};
      expect(isCollection([])).toBe(true);
      expect(isCollection(matrixMock)).toBe(true);
    });

    test('should return false for non-collection objects', () => {
      expect(isCollection(null)).toBe(false);
      expect(isCollection({})).toBe(false);
      expect(isCollection(42)).toBe(false);
    });
  });

  describe('isDenseMatrix', () => {
    test('should return true for DenseMatrix-like objects', () => {
      const denseMatrixMock = {isDenseMatrix: true, constructor: {prototype: {isMatrix: true}}};
      expect(isDenseMatrix(denseMatrixMock)).toBe(true);
    });

    test('should return false for non-DenseMatrix objects', () => {
      expect(isDenseMatrix(null)).toBe(false);
      expect(isDenseMatrix({})).toBe(false);
      expect(isDenseMatrix([])).toBe(false);
    });
  });

  describe('isSparseMatrix', () => {
    test('should return true for SparseMatrix-like objects', () => {
      const sparseMatrixMock = {isSparseMatrix: true, constructor: {prototype: {isMatrix: true}}};
      expect(isSparseMatrix(sparseMatrixMock)).toBe(true);
    });

    test('should return false for non-SparseMatrix objects', () => {
      expect(isSparseMatrix(null)).toBe(false);
      expect(isSparseMatrix({})).toBe(false);
      expect(isSparseMatrix([])).toBe(false);
    });
  });
});
