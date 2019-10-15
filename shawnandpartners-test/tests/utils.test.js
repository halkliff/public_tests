const isNullOrUndefined = require('../utils/isNullOrUndefined');

describe('Test to see if the Function can define whether the object is Null or Undefined.', () => {
    test('is Null', () => {
        expect(isNullOrUndefined(null)).toBe(true)
    });
    test('is Undefined', () => {
        expect(isNullOrUndefined(undefined)).toBe(true)
    });
    test('it\'s a Number, should return false', () => {
        expect(isNullOrUndefined(2019)).toBe(false)
    });
});
