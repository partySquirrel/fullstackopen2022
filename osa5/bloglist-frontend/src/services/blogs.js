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

const blogService = {
  getAll,
  create,
}

export default blogService