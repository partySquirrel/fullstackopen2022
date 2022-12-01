import { createSlice } from '@reduxjs/toolkit'

const initialState = 'I am a notification!'

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    clearNotification() {
      return ''
    },
  },
})

export const showNotification = (content) => {
  return (dispatch) => {
    dispatch(setNotification(content))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }
}

export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer