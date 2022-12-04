import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

  const addNew = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(content)
    props.showNotification(`Created '${content}'`, 5)
  }

  return (<>
    <h2>create new</h2>
    <form onSubmit={addNew}>
      <input name="anecdote"/>
      <button type="submit">create</button>
    </form>
  </>
  )
}


const mapDispatchToProps = {
  createAnecdote,
  showNotification
}

const mapStateToProps = () => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteForm)