const mostBlogs = require('../utils/list_helper').mostBlogs
const blogs = require('./testdata/blogs')

describe('favorite blog', () => {
    
  test('of empty list is NaN', () => {
    expect(mostBlogs([])).toEqual(NaN)
  })

  test('when list has only one blog equals the blog author', () => {
    expect(mostBlogs([blogs[0]])).toEqual({author: blogs[0].author, blogs: 1})
  })

  test('of a bigger list returns most popular blogger and count', () => {
    expect(mostBlogs(blogs)).toEqual({author: "Robert C. Martin", blogs: 3})
  })
})