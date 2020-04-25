import { getUniqueId } from './Utiltities.js';

describe('Utilities', () => {
  describe('getUniqueId()', () => {
    test('should not return null', () => {
      expect(getUniqueId()).not.toEqual(null);
    });
  });
})