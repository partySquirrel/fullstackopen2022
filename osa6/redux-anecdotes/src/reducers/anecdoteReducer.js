import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
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

export const { createAnecdote, voteForAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer