import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addNew = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const created = await anecdoteService.createNew(content)
    dispatch(createAnecdote(created))
    dispatch(showNotification(`Created '${content}'`))
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