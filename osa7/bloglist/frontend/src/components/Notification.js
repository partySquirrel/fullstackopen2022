import { useSelector } from 'react-redux'
import Alert from 'react-bootstrap/Alert'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (!notification) return null

  return (
    <Alert key={notification.severity} variant={notification.severity}>
      {notification.message}
    </Alert>
  )
}

export default Notification
