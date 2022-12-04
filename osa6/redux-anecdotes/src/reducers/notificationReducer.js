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

export const showNotification = (content, timeoutSeconds) => {
  const millis = 1000
  return (dispatch) => {
    dispatch(setNotification(content))
    setTimeout(() => {
      dispatch(clearNotification())
    }, timeoutSeconds * millis)
  }
}

export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer