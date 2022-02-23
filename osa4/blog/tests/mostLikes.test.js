const mostLikes = require('../utils/list_helper').mostLikes
const blogs = require('./testdata/blogs')

describe('favorite blog', () => {
    
  test('of empty list is NaN', () => {
    expect(mostLikes([])).toEqual(NaN)
  })

  test('when list has only one blog equals the blog author and likes', () => {
    expect(mostLikes([blogs[0]])).toEqual({author: blogs[0].author, likes: blogs[0].likes})
  })

  test('of a bigger list returns most popular blogger and likes', () => {
    expect(mostLikes(blogs)).toEqual({author: "Edsger W. Dijkstra", likes: 17})
  })
})