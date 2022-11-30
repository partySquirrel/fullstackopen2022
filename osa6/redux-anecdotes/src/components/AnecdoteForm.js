import { useDispatch } from 'react-redux'
import { create } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addNew = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(create(content))
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