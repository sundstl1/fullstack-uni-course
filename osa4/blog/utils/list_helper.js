const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }
    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return NaN
    const reducer = (best, item) => {
        return best.likes > item.likes
            ? best
            : item
    }
    return blogs.reduce(reducer, {likes: -1})
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) return NaN

    const authorRanking = {};
    const best = {author: "", blogs: 0}
    
    blogs.forEach(blog => {
        blog.author in authorRanking
            ? authorRanking[blog.author] += 1
            : authorRanking[blog.author] = 1
        if (authorRanking[blog.author] > best.blogs) {
            best.blogs = authorRanking[blog.author]
            best.author = blog.author
        }
    });
    return best
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) return NaN

    const authorRanking = {};
    const best = {author: "", likes: -1}
    
    blogs.forEach(blog => {
        blog.author in authorRanking
            ? authorRanking[blog.author] += blog.likes
            : authorRanking[blog.author] = blog.likes
        if (authorRanking[blog.author] > best.likes) {
            best.likes = authorRanking[blog.author]
            best.author = blog.author
        }
    });
    return best
}
  
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}