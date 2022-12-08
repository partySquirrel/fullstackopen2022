import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  const styles = `notification ${notification.severity}`

  return <div className={styles}>{notification.message}</div>
}

export default Notification
