const listHelper = require('../utils/list_helper')
const { testBlogs } = require('./testData')

describe('total likes', () => {
  test('when list is empty likes are 0', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(testBlogs.slice(0, 1))
    expect(result).toBe(7)
  })

  test('when list has multiple blogs equals the sum of likes', () => {
    const result = listHelper.totalLikes(testBlogs)
    expect(result).toBe(36)
  })
})

describe('favorite blog', () => {
  test('when list is empty returns empty object', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toEqual({})
  })

  test('when list has only one blog returns that', () => {
    const result = listHelper.favoriteBlog(testBlogs.slice(0, 1))
    expect(result).toEqual({
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      __v: 0
    })
  })

  test('when list has multiple blogs returns blog with most likes', () => {
    const result = listHelper.favoriteBlog(testBlogs)
    expect(result).toEqual({
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0
    })
  })
})

describe('most blogs', () => {
  test('when list is empty returns empty object', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toEqual({})
  })

  test('when list has only one blog returns that', () => {
    const result = listHelper.mostBlogs(testBlogs.slice(0, 1))
    expect(result).toEqual({
      author: 'Michael Chan',
      blogs: 1,
    })
  })

  test('when list has multiple blogs returns author with most blogs', () => {
    const result = listHelper.mostBlogs(testBlogs)
    expect(result).toEqual({
      author: 'Robert C. Martin',
      blogs: 3,
    })
  })
})

describe('most likes', () => {
  test('when list is empty returns empty object', () => {
    const result = listHelper.mostLikes([])
    expect(result).toEqual({})
  })

  test('when list has only one blog returns that', () => {
    const result = listHelper.mostLikes(testBlogs.slice(0, 1))
    expect(result).toEqual({
      author: 'Michael Chan',
      likes: 7,
    })
  })

  test('when list has multiple blogs returns author with most likes', () => {
    const result = listHelper.mostLikes(testBlogs)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17,
    })
  })
})