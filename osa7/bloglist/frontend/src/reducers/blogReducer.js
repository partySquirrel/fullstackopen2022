import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    updateBlog(state, action) {
      const id = action.payload.id
      return state.map((item) => (item.id !== id ? item : action.payload))
    },
    delete(state, action) {
      const id = action.payload.id
      return state.filter((item) => item.id !== id)
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
  },
})

export const initializeBlogs = () => {
  return async (dispatch) => {
    const items = await blogService.getAll()
    dispatch(blogSlice.actions.setBlogs(items))
  }
}

export const createBlog = (blog, user) => {
  return async (dispatch) => {
    const item = await blogService.create(
      blog.title,
      blog.author,
      blog.url,
      user
    )
    item.user = user
    dispatch(blogSlice.actions.appendBlog(item))
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const updated = {
      ...blog,
      likes: blog.likes + 1,
    }
    await blogService.update(updated)
    dispatch(blogSlice.actions.updateBlog(updated))
  }
}

export const removeBlog = (blog, user) => {
  return async (dispatch) => {
    await blogService.remove(blog.id, user)
    dispatch(blogSlice.actions.delete(blog))
  }
}

export default blogSlice.reducer
