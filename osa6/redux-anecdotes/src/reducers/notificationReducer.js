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

let timeoutID
export const showNotification = (content, timeoutSeconds) => {
  const millis = 1000
  return (dispatch) => {
    dispatch(setNotification(content))

    if (timeoutID !== undefined) clearTimeout(timeoutID)

    timeoutID = setTimeout(() => {
      dispatch(clearNotification())
    }, timeoutSeconds * millis)
  }
}

export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer