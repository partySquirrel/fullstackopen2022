const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => total + blog.likes, 0)
}
const favoriteBlog = (blogs) => {
  return blogs.reduce((topBlog, blog) => topBlog.likes > blog.likes ? topBlog : blog, {})
}

module.exports = {
  totalLikes,
  favoriteBlog
}