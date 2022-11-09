const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => total + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((topBlog, blog) => topBlog.likes > blog.likes ? topBlog : blog, {})
}

const mostBlogs = (blogs) => {
  if (!blogs) {
    return {}
  } else if (blogs.length === 1) {
    const top = blogs.pop()
    return {
      author: top.author,
      blogs: 1
    }
  }
  const mapByAuthor = blogs.reduce((map, blog) => {
    map.get(blog.author)?.push(blog) ?? map.set(blog.author, [blog])
    return map
  }, new Map())

  const arrayByAuthor = [...mapByAuthor.keys()].map(author => {
    return {
      author: author,
      blogs: mapByAuthor.get(author).length,
    }
  })

  return arrayByAuthor.reduce((top, author) => top.blogs > author.blogs ? top : author, {})
}

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs
}