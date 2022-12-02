import anecdoteReducer from './anecdoteReducer'
import deepFreeze from 'deep-freeze'

describe('anecdoteReducer', () => {
  test('returns new state with action NEW', () => {
    const state = []
    const action = {
      type: 'anecdotes/appendAnecdote',
      payload: {
        content: 'vitsivitsi',
        id: 1,
        votes: 0
      }
    }

    deepFreeze(state)
    const newState = anecdoteReducer(state, action)

    expect(newState).toHaveLength(1)
    expect(newState).toContainEqual(action.payload)
  })

  test('returns new state with action VOTE', () => {
    const state = [
      {
        content: 'vitsivitsi',
        id: 1,
        votes: 0
      }
    ]

    const action = {
      type: 'anecdotes/voteForAnecdote',
      payload: 1
    }

    deepFreeze(state)
    const newState = anecdoteReducer(state, action)

    expect(newState).toHaveLength(1)
    expect(newState).toContainEqual({
      content: 'vitsivitsi',
      id: 1,
      votes: 1
    })
  })
})