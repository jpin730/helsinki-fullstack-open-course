const { test } = require('node:test');
const assert = require('node:assert');

const listHelper = require('../utils/list-helper');

test('dummy returns one', () => {
  // Arrange

  // Act
  const result = listHelper.dummy();

  // Assert
  assert.strictEqual(result, 1);
});
