const Notification = ({ message, severity}) => {
  if (message === null) {
    return null
  }

  const styles = `notification ${severity}`

  return (
    <div className={styles}>
      {message}
    </div>
  )
}

export default Notification