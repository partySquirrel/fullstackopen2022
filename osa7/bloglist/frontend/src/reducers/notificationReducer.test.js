import notificationReducer from './notificationReducer'
import deepFreeze from 'deep-freeze'

describe('notificationReducer', () => {
  test('returns new state with action notification/setNotification', () => {
    const state = ''

    const action = {
      type: 'notification/setNotification',
      payload: 'vitsivitsi',
    }

    deepFreeze(state)
    const newState = notificationReducer(state, action)

    expect(newState).toEqual('vitsivitsi')
  })

  test('returns new state with action notification/clearNotification', () => {
    const state = 'trololoo'

    const action = {
      type: 'notification/clearNotification',
    }

    deepFreeze(state)
    const newState = notificationReducer(state, action)

    expect(newState).toEqual(null)
  })
})
