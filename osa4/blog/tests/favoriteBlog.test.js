const favoriteBlog = require('../utils/list_helper').favoriteBlog
const blogs = require('./testdata/blogs')

describe('favorite blog', () => {
    
  test('of empty list is NaN', () => {
    expect(favoriteBlog([])).toEqual(NaN)
  })

  test('when list has only one blog equals the blog author', () => {
    expect(favoriteBlog([blogs[0]])).toEqual(blogs[0])
  })

  test('of a bigger list returns most popular blog', () => {
    expect(favoriteBlog(blogs)).toEqual(blogs[2])
  })
})