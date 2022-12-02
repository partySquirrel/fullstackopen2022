import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteForAnecdote(state, action) {
      const id = action.payload
      const itemToChange = state.find(item => item.id === id)
      const changedItem = {
        ...itemToChange,
        votes: itemToChange.votes + 1
      }
      return state.map(item =>
        item.id !== id ? item : changedItem
      )
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
})

export const {  voteForAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const items = await anecdoteService.getAll()
    dispatch(setAnecdotes(items))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const item = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(item))
  }
}

export default anecdoteSlice.reducer