import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from '../reducers/notificationReducer'
import blogReducer from '../reducers/blogReducer'
import loginReducer from '../reducers/loginReducer'
import userReducer from '../reducers/userReducer'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    users: userReducer,
    loggedInUser: loginReducer,
  },
})

console.log(store.getState())

export default store
