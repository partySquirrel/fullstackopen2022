import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'

const loginSlice = createSlice({
  name: 'loggedInUser',
  initialState: null,
  reducers: {
    login(state, action) {
      return action.payload
    },
    logout() {
      return null
    },
  },
})

const loggedBlogUserKey = 'loggedBlogUser'

export const initializeUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem(loggedBlogUserKey)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(loginSlice.actions.login(user))
    }
  }
}

export const loginUser = (username, password) => {
  return async (dispatch) => {
    const loggedInUser = await loginService.login({
      username,
      password,
    })
    dispatch(loginSlice.actions.login(loggedInUser))
    window.localStorage.setItem(loggedBlogUserKey, JSON.stringify(loggedInUser))
  }
}

export const logoutUser = () => {
  return async (dispatch) => {
    dispatch(loginSlice.actions.logout())
    window.localStorage.removeItem(loggedBlogUserKey)
  }
}

export default loginSlice.reducer
