import PropTypes from 'prop-types'

const Notification = ({ message, severity }) => {
  if (message === null) {
    return null
  }

  const styles = `notification ${severity}`

  return <div className={styles}>{message}</div>
}

Notification.propTypes = {
  message: PropTypes.string,
  severity: PropTypes.string,
}
export default Notification
