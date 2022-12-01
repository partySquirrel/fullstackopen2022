import notificationReducer from './notificationReducer'
import deepFreeze from 'deep-freeze'

describe('notificationReducer', () => {
  test('returns new state with action NEW', () => {
    const state = []
    const action = {
      type: 'NEW',
      data: 'huomio!'
    }

    deepFreeze(state)
    const newState = notificationReducer(state, action)

    expect(newState).toEqual(action.data)
  })
})