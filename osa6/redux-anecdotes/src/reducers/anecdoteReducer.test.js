import anecdoteReducer from './anecdoteReducer'
import deepFreeze from 'deep-freeze'

describe('anecdoteReducer', () => {
  test('returns new state with action NEW', () => {
    const state = []
    const action = {
      type: 'NEW',
      data: {
        content: "vitsivitsi",
        id: 1,
        votes: 0
      }
    }

    deepFreeze(state)
    const newState = anecdoteReducer(state, action)

    expect(newState).toHaveLength(1)
    expect(newState).toContainEqual(action.data)
  })

  test('returns new state with action VOTE', () => {
    const state = [
      {
        content: "vitsivitsi",
        id: 1,
        votes: 0
      }
    ]

    const action = {
      type: 'VOTE',
      data: {
        id: 1
      }
    }

    deepFreeze(state)
    const newState = anecdoteReducer(state, action)

    expect(newState).toHaveLength(1)
    expect(newState).toContainEqual({
      content: "vitsivitsi",
      id: 1,
      votes: 1
    })
  })
})