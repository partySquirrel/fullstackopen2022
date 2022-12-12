import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from '../reducers/notificationReducer'
import blogReducer from '../reducers/blogReducer'
import loginReducer from '../reducers/loginReducer'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    loggedInUser: loginReducer,
  },
})

console.log(store.getState())

export default store
