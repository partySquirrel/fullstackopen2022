const listHelper = require('../utils/list_helper')
const { testBlogs } = require("./testData");

describe('total likes', () => {
  test('when list is empty likes are 0', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(testBlogs.slice(0,1))
    expect(result).toBe(7)
  })

  test('when list has blogs blog equals the sum of likes', () => {
    const result = listHelper.totalLikes(testBlogs)
    expect(result).toBe(36)
  })
})