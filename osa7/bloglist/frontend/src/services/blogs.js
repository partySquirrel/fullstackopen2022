import axios from 'axios'

const baseUrl = '/api/blogs'

const getHeaderWithToken = (user) => {
  const config = {
    headers: { Authorization: `bearer ${user.token}` },
  }

  return config
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (title, author, url, user) => {
  const blog = {
    title: title,
    author: author,
    url: url,
  }
  const config = getHeaderWithToken(user)
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const remove = async (id, user) => {
  const config = getHeaderWithToken(user)
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response
}

const update = async (id, title, author, url, likes) => {
  const blog = {
    title: title,
    author: author,
    url: url,
    likes: likes,
  }
  const response = await axios.put(`${baseUrl}/${id}`, blog)
  return response.data
}

const blogService = {
  getAll,
  create,
  update,
  remove,
}

export default blogService
