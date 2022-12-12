import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

const userSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      console.log('users', action.payload)
      return action.payload
    },
  },
})

export const initializeUsers = () => {
  return async (dispatch) => {
    const items = await userService.getAll()
    dispatch(userSlice.actions.setUsers(items))
  }
}

export default userSlice.reducer
