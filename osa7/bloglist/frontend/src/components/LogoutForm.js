import React from 'react'
import { showError, showNotification } from '../reducers/notificationReducer'
import { logoutUser } from '../reducers/loginReducer'
import { useDispatch, useSelector } from 'react-redux'

const LogoutForm = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.loggedInUser)

  const handleLogout = async () => {
    dispatch(logoutUser())
      .then(() => {
        dispatch(showNotification('user logged out', 5))
      })
      .catch((error) => {
        dispatch(showError(error, 5))
      })
  }

  return (
    <>
      {user.name} logged in{' '}
      <button
        className="btn btn-light btn-sm"
        onClick={handleLogout}
        id="logout"
      >
        Log out
      </button>
    </>
  )
}

export default LogoutForm
