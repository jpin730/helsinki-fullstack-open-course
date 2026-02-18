const { test, describe } = require('node:test');
const assert = require('node:assert');

const listHelper = require('../utils/list-helper');

const mockedBlogs = require('../mocks/blogs');

test('dummy returns one', () => {
  // Arrange

  // Act
  const result = listHelper.dummy();

  // Assert
  assert.strictEqual(result, 1);
});

describe('total likes', () => {
  test('of empty list is zero', () => {
    // Arrange
    const emptyList = [];

    // Act
    const result = listHelper.totalLikes(emptyList);

    // Assert
    assert.strictEqual(result, 0);
  });

  test('when list has only one blog, equals the likes of that', () => {
    // Arrange
    const listWithOneBlog = [structuredClone(mockedBlogs.at(0))];

    // Act
    const result = listHelper.totalLikes(listWithOneBlog);

    // Assert
    assert.strictEqual(result, listWithOneBlog.at(0).likes);
  });

  test('of a bigger list is calculated right', () => {
    // Arrange
    const blogs = structuredClone(mockedBlogs);

    // Act
    const result = listHelper.totalLikes(blogs);

    // Assert
    assert.strictEqual(result, 36);
  });
});

describe('favorite blog', () => {
  test('of empty list is null', () => {
    // Arrange
    const emptyList = [];

    // Act
    const result = listHelper.favoriteBlog(emptyList);

    // Assert
    assert.strictEqual(result, null);
  });

  test('when list has only one blog, equals that blog', () => {
    // Arrange
    const listWithOneBlog = [structuredClone(mockedBlogs.at(0))];

    // Act
    const result = listHelper.favoriteBlog(listWithOneBlog);

    // Assert
    assert.deepStrictEqual(result, listWithOneBlog.at(0));
  });

  test('of a bigger list is found right', () => {
    // Arrange
    const blogs = structuredClone(mockedBlogs);

    // Act
    const result = listHelper.favoriteBlog(blogs);

    // Assert
    assert.deepStrictEqual(result, mockedBlogs.at(2));
  });
});
