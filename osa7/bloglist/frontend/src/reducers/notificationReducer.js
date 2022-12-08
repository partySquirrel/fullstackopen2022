import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

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
const millis = 1000
export const showNotification = (content, timeoutSeconds) => {
  return (dispatch) => {
    dispatch(setNotification({ message: content, severity: 'success' }))
    if (timeoutID !== undefined) clearTimeout(timeoutID)
    setTimeout(() => {
      dispatch(clearNotification())
    }, timeoutSeconds * millis)
  }
}
export const showError = (content, timeoutSeconds) => {
  return (dispatch) => {
    dispatch(setNotification({ message: content, severity: 'error' }))
    if (timeoutID !== undefined) clearTimeout(timeoutID)
    setTimeout(() => {
      dispatch(clearNotification())
    }, timeoutSeconds * millis)
  }
}

export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer
