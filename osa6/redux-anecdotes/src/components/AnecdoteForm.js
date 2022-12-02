import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addNew = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
    dispatch(showNotification(`Created '${content}'`, 5))
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

export default AnecdoteForm