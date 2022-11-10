const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
]
const initialUsers = [
  {
    username:'foobar',
    name: 'Foo Bar',
    passwordHash: '$2b$10$GiVMWCspZyCWjQl9MV2u1.Umt4DTKQzFjPnFe1SjzkqDnqomzw/ga',
  },
  {
    username:'yolo',
    name: 'Yolo Fomo',
    passwordHash: '$2b$10$GiVMWCspZyCWjQl9MV2u1.Umt4DTKQzFjPnFe1SjzkqDnqomzw/ga',
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const existingBlogId = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())[0].id
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const existingUserId = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())[0].id
}

module.exports = {
  initialBlogs, blogsInDb, existingBlogId, initialUsers, usersInDb, existingUserId
}