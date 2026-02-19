const { test, describe } = require('node:test')
const assert = require('node:assert')

const listHelper = require('../utils/list-helper')

const { BLOGS } = require('./test-helper')

test('dummy returns one', () => {
  // Arrange

  // Act
  const result = listHelper.dummy()

  // Assert
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    // Arrange
    const emptyList = []

    // Act
    const result = listHelper.totalLikes(emptyList)

    // Assert
    assert.strictEqual(result, 0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    // Arrange
    const listWithOneBlog = [BLOGS.at(0)]

    // Act
    const result = listHelper.totalLikes(listWithOneBlog)

    // Assert
    assert.strictEqual(result, listWithOneBlog.at(0).likes)
  })

  test('of a bigger list is calculated right', () => {
    // Arrange
    const blogs = BLOGS

    // Act
    const result = listHelper.totalLikes(blogs)

    // Assert
    assert.strictEqual(result, 36)
  })
})

describe('favorite blog', () => {
  test('of empty list is null', () => {
    // Arrange
    const emptyList = []

    // Act
    const result = listHelper.favoriteBlog(emptyList)

    // Assert
    assert.strictEqual(result, null)
  })

  test('when list has only one blog, equals that blog', () => {
    // Arrange
    const listWithOneBlog = [BLOGS.at(0)]

    // Act
    const result = listHelper.favoriteBlog(listWithOneBlog)

    // Assert
    assert.deepStrictEqual(result, listWithOneBlog.at(0))
  })

  test('of a bigger list is found right', () => {
    // Arrange
    const blogs = BLOGS

    // Act
    const result = listHelper.favoriteBlog(blogs)

    // Assert
    assert.deepStrictEqual(result, BLOGS.at(2))
  })
})

describe('most blogs', () => {
  test('of empty list is null', () => {
    // Arrange
    const emptyList = []

    // Act
    const result = listHelper.mostBlogs(emptyList)

    // Assert
    assert.strictEqual(result, null)
  })

  test('when list has only one blog, equals that author with 1 blog', () => {
    // Arrange
    const listWithOneBlog = [BLOGS.at(0)]

    // Act
    const result = listHelper.mostBlogs(listWithOneBlog)

    // Assert
    assert.deepStrictEqual(result, {
      author: 'Michael Chan',
      blogs: 1,
    })
  })

  test('of a bigger list is found right', () => {
    // Arrange
    const blogs = BLOGS

    // Act
    const result = listHelper.mostBlogs(blogs)

    // Assert
    assert.deepStrictEqual(result, {
      author: 'Robert C. Martin',
      blogs: 3,
    })
  })
})

describe('most likes', () => {
  test('of empty list is null', () => {
    // Arrange
    const emptyList = []

    // Act
    const result = listHelper.mostLikes(emptyList)

    // Assert
    assert.strictEqual(result, null)
  })

  test('when list has only one blog, equals that author with their likes', () => {
    // Arrange
    const listWithOneBlog = [BLOGS.at(0)]

    // Act
    const result = listHelper.mostLikes(listWithOneBlog)

    // Assert
    assert.deepStrictEqual(result, {
      author: 'Michael Chan',
      likes: 7,
    })
  })

  test('of a bigger list is found right', () => {
    // Arrange
    const blogs = BLOGS

    // Act
    const result = listHelper.mostLikes(blogs)

    // Assert
    assert.deepStrictEqual(result, {
      author: 'Edsger W. Dijkstra',
      likes: 17,
    })
  })
})
